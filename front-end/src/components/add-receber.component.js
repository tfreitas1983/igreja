import React, { Component } from 'react'
import { uniqueId } from "lodash"
import filesize from "filesize"
import http from "../http-common"
import GlobalStyle from "../styles/global"
import { Container, Content } from "./styles"
import Upload from "./Upload"
import FileList from "./FileList"

import ReceitaDataService from "../services/receita.service"
import CategoriaDataService from "../services/categoria.service"
import MembroDataService from '../services/membro.service'
import moment from 'moment'


export default class AdicionarReceber extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoValor = this.estadoValor.bind(this)
        this.estadoPagamento = this.estadoPagamento.bind(this)
        this.estadoDataLiquidado = this.estadoDataLiquidado.bind(this)
        this.estadoCategoria = this.estadoCategoria.bind(this)
        this.estadoTipo = this.estadoTipo.bind(this)
        this.estadoFormaPagamento = this.estadoFormaPagamento.bind(this)
        this.estadoParcelas = this.estadoParcelas.bind(this)
        this.estadoStatus = this.estadoStatus.bind(this)

        this.buscarNome = this.buscarNome.bind(this)
        this.pegaCategoria = this.pegaCategoria.bind(this)
        this.salvarCategoria = this.salvarCategoria.bind(this)
        this.estadoBuscaNome = this.estadoBuscaNome.bind(this)
        this.selecionaPagina = this.selecionaPagina.bind(this)
                
        this.salvarReceber = this.salvarReceber.bind(this)
        this.novoReceber = this.novoReceber.bind(this)

        this.state = {
            descricao: "",
            valor: "",
            cat: [],
            dtpagamento: "",
            dtliquidado: "",
            status: "",
            categoria: "",
            membros: [],
            tipo: "receita",
            formapagamento: "",
            parcelas:"",
            buscaNome: "",
            currentMembro: null,
            currentIndex: -1,
            info:{},
            page: 1,
            uploadedFiles: [],
            arquivos: [],            
            selectedPage: null
        }
    }

    componentDidMount() {
        this.pegaCategoria()        
    }

    handleUpload = files => {
        const uploadedFiles = files.map(file => ({
          file,
          id: uniqueId(),
          name: file.name,
          readableSize: filesize(file.size),
          preview: URL.createObjectURL(file),
          progress: 0,
          uploaded: false,
          error: false,
          url: null
        }))
    
        this.setState({
          uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)          
        })
    
        uploadedFiles.forEach(this.processUpload)
      }

      updateFile = (id, data) => {
        this.setState({
          uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
            return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile
          })
        })
      }

      processUpload = uploadedFile => {
        const data = new FormData()
    
        data.append("file", uploadedFile.file, uploadedFile.name)
    
       
        http                            
          .post("/membros/files", data, {
            onUploadProgress: e => {
              const progress = parseInt(Math.round((e.loaded * 100) / e.total))
    
              this.updateFile(uploadedFile.id, {
                progress
              })
            }
          })
          .then(response => {
            this.updateFile(uploadedFile.id, {
              uploaded: true,
              id: response.data._id,
              url: response.data.url,
              foto: response.data.foto
            })
          })
          .catch(() => {
            this.updateFile(uploadedFile.id, {
              error: true
            })
          })
      }

      handleDelete = async id => {
        await http.delete(`/membros/files/${id}`)
    
        this.setState({
          uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
        })
      }
    
      componentWillUnmount() {
        this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
      }


    estadoDescricao(e){
        const descricao = e.target.value
        this.setState({
            descricao: descricao
        })

    }

    estadoValor(e){
        const valor = e.target.value
        this.setState({
            valor: valor
        }) 
    }

    estadoPagamento(e) {
        const dtpagamento = e.target.value
        this.setState({
            dtpagamento: dtpagamento
        }) 
    }

    estadoDataLiquidado(e) {
        const dtliquidado = e.target.value
        this.setState({
            dtliquidado: dtliquidado
        }) 
    }

    estadoCategoria(e) {
        const categoria = e.target.value
        this.setState({
            categoria: categoria
        }) 

        if (this.state.categoria !== 'Dízimo') {
            this.setState(prevState => ({
                currentMembro: {
                    ...prevState.currentMembro,
                    nome: ""
                }
            }))
        }
    }

    estadoTipo(e){
        const tipo = e.target.value
        this.setState({
            tipo: tipo
        })
    }

    estadoFormaPagamento(e) {
        const formapagamento = e.target.value
        this.setState({
            formapagamento: formapagamento
        }) 
    }

    estadoParcelas(e) {
        const parcelas = e.target.value
        this.setState({
            parcelas: parcelas
        }) 
    }

    estadoStatus(e) {
        const status = e.target.value
        this.setState({
            status: status
        }) 
        //Se a situação for pago ou liquidado e voltar à pendente
        //deve-se limpar os estados desses campos
        if(status === "Pendente") {
            this.limpaEstados()
        }
    }

    
    estadoBuscaNome(e) {
        const buscaNome = e.target.value

        this.setState({
            buscaNome: buscaNome
        })
    }

    selecionaPagina(e) {
        const i = e.target.id
        const selectedPage = e.target.id
         this.setState({
            selectedPage: i,
            page: selectedPage
        })
            this.buscarNome(selectedPage)      
    } 

    buscarNome(page = 1) {
        MembroDataService.buscarNome(this.state.buscaNome, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    membros: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
    }
    
    ativaMembro(membro, index) {
        this.setState({
            currentMembro: membro,
            currentIndex: index
        })
    }


    pegaCategoria(){
        CategoriaDataService.buscarTodos()
            .then(response => {
               // const cat = response.data
                this.setState({
                    cat: response.data
                })
            })
            
            .catch(e => {
                console.log(e)
            })
    }

    salvarCategoria() {
        var data = {
            categoria: this.state.categoria,
            tipo: "receita"
        }

        CategoriaDataService.cadastrar(data)
            .then(response => {
                this.setState({
                    categoria: response.data.categoria,
                    tipo: response.data.tipo
                })
            })
            .catch(e => {
                console.log(e)
            })
            this.pegaCategoria()
            this.hideModalCategoria()
            
    }

    salvarReceber(){

        

        var data = {
            descricao: this.state.descricao,
            valor: this.state.valor,
            status: this.state.status,
            dtpagamento: moment(this.state.dtpagamento, 'DD/MM/YYYY'),
            dtliquidacao: moment(this.state.dtliquidado, 'DD/MM/YYYY'),
            formapagamento: this.state.formapagamento,
            categoria: this.state.categoria,
            parcelas: this.state.parcelas,
            membro: this.state.currentMembro.nome,
            arquivos: (this.state.uploadedFiles).map((item) => {return item.foto})
        }

        ReceitaDataService.cadastrar(data) 
            .then(response => {
                this.setState({
                    id: response.data.id,
                    numrec: response.data.numdesp,
                    descricao: response.data.descricao,
                    valor: response.data.valor,
                    dtpagamento: response.data.dtpagamento,
                    dtliquidacao: response.data.dtliquidacao,
                    formapagamento: response.data.formapagamento,                    
                    categoria: response.data.categoria,
                    membro: response.data.membro,
                    parcelas: response.data.parcelas,
                    arquivos: response.data.arquivos,
                    status: response.data.status,
                    situacao: response.data.situacao,
                    submitted: true
                })
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })     
    }

    novoReceber() {
        this.setState({
            descricao: "",
            valor: "",
            dtpagamento: "",
            dtliquidado: "",
            status: "",
            categoria: "",
            tipo: "receita",
            formapagamento: "",
            parcelas:"",
            situacao: ""
        })
    }

    limpaEstados(){
        this.setState({
            dtliquidado: "",
            dtpagamento: ""            
        })
    }

    limpaCurrent() {
        this.setState({
            currentMembro: null,
            currentIndex: -1
        })
    }
    

    showModalCategoria = () => {
        this.setState({ showCategoria: true })
      }
    
    hideModalCategoria = () => {
        this.setState({ showCategoria: false })
    }

        
    render() {

        const {buscaNome, membros, currentIndex, currentMembro, info, page, uploadedFiles} = this.state

         //Verifica se o status é "Pago" e reinderiza o campo de data de pagamento
         let pago = null
         if(this.state.status === "Pago") {
             pago = <div className="form-group">
                         <label> Data pagamento </label>
                             <input type="text" className="form-control" 
                                 id="dtpagamento" 
                                 required 
                                 value={this.state.dtpagamento} 
                                 onChange={this.estadoPagamento} 
                                 name="dtpagamento"
                             />
                     </div>
         } 
 
         //Verifica se o status é "Liquidado" e reinderiza o campo de data de liquidação
         let liquidado = null
         if(this.state.status === "Liquidado") {
             pago = 
                 <div className="form-group">
                     <label> Data pagamento </label>
                         <input type="text" className="form-control" id="dtpagamento" required value={this.state.dtpagamento} onChange={this.estadoPagamento} name="dtpagamento" />
                 </div>
             liquidado = 
                 <div className="form-group">
                     <label> Data de liquidação </label>
                     <input type="text" className="form-control" id="dtliquidado" required value={this.state.dtliquidado} onChange={this.estadoDataLiquidado} name="dtliquidado" />
                 </div> 
         }
 
         
         //Verifica se o status não é parcelado para liberar as formas de pagamento
         let selecionado = ""
         if(this.state.status !== "Parcelado") {
             selecionado = this.state.formapagamento
         }
         
         //Verifica se o pagamento é parcelado, reinderiza a quantidade de parcelas
         //e escolhe a forma de pagamento "Cartão de Crédito"
         let parcelado = null
         if(this.state.status === "Parcelado") { 
             selecionado = "Cartão de Crédito"
             parcelado = <div className="form-group">
                             <label> Número de parcelas </label>
                             <select 
                                 className="form-control" 
                                 id="parcelas" 
                                 name="parcelas"
                                 value={this.state.parcelas}                                    
                                 onChange={this.estadoParcelas}
                             >                                    
                                 <option value="" disabled> --Selecione-- </option> 
                                 <option value="1"> 1X </option>
                                 <option value="2"> 2X </option>  
                                 <option value="3"> 3X </option> 
                                 <option value="4"> 4X </option>
                                 <option value="5"> 5X </option>
                                 <option value="6"> 6X </option>
                                 <option value="7"> 7X </option>  
                                 <option value="8"> 8X </option> 
                                 <option value="9"> 9X </option>
                                 <option value="10"> 10X </option>
                                 <option value="11"> 11X </option>
                                 <option value="12"> 12X </option>
                             </select>
                         </div>
         }
 
         //Mostra o modal de criação de categoria
         let modalCategoria = null
         if(this.state.showCategoria === true) {
             modalCategoria = 
                 <div className="modal_bg">
                     <div className="modal">
                     <button type="button" className="closeButton" id="closeButton" onClick={this.hideModalCategoria}>X</button>
                         <h2> Cadastrar Categoria</h2>
                             <input 
                                 type="text"
                                 className="form-control" 
                                 id="categoria" 
                                 required 
                                 value={this.state.categoria}
                                 onChange={this.estadoCategoria}
                                 placeholder="Digite o nome da categoria"/>
                             
                             <button onClick={this.salvarCategoria} className="btn btn-success">
                                 Adicionar
                             </button>
                     </div>
                 </div>
         }
         //Filtra somente as categorias de receitas
        let filtro = (this.state.cat).filter((item) => {
             return item.tipo === 'receita'
         })
         //Mostra as categorias já filtradas
         let catreceitas = filtro.map((categoria, index) => (
            <option value={categoria.categoria} key={index}>{categoria.categoria}</option>
        ))

        //Reinderiza os números das páginas de acordo com o total delas
        //Deixando selecionado a página corrente no array paginas
        let i = 0
        let paginas = []
        if (this.state.categoria === 'Dízimo') {
            for ( i = 1; i <= info.pages; i++ ) {
                paginas.push(
                    <li className={"page-item " + (page === i ? "active" : "")} key={i}>
                        <span className="page-link" key={i} id={i} onClick={this.selecionaPagina} >
                            {i}
                        </span>
                    </li>
                )            
            } 
        }
        
        let mostrar = null
        if (currentMembro && currentMembro != null) {
            mostrar =  <div className="autocomplete-active">
                {currentMembro.nome}
            </div>
        } if (this.state.categoria === 'Dízimo' && currentMembro === null) {
            mostrar = 
            <div className="list-group">
           { membros && membros.map((membro, index) => (
                <div className={"list-group-item " + (index === currentIndex ? "active" : "")} 
                onClick={() => this.ativaMembro(membro, index)} 
                key={index} > 
                    {membro.nome}
                </div>
            ))}
            </div>
        }                   
        
        let dizimo = null
        if (this.state.categoria === 'Dízimo') {
            dizimo = 
            <div>               
                <label>Membro</label>                 
                <div className="autocomplete">
                    <input 
                        type="text"
                        className="autocomplete" 
                        id="membro" 
                        name="membro" 
                        value={buscaNome} 
                        onKeyUp={this.buscarNome} 
                        onClick={this.buscarNome}
                        onChange={this.estadoBuscaNome}
                        autoComplete="off" />                    
                </div>
                {mostrar}                    
            </div>
        }

        

        return (
            <div className="list">
            { this.state.submitted ? (
                <div>
                    <h4> Envio completado com sucesso!</h4>
                    <button className="btn btn-success" onClick={this.novoReceber}>
                        Adicionar
                    </button>
                </div>
            ) : (                
                <div>
                    <h4> Cadastrar Receita </h4>
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="descricao"> Descrição </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="descricao" 
                            required 
                            value={this.state.descricao} 
                            onChange={this.estadoDescricao} 
                            name="razao" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="valor"> Valor </label>
                            <input 
                            type="number" 
                            className="form-control" 
                            id="valor" 
                            required 
                            value={this.state.valor} 
                            onChange={this.estadoValor} 
                            name="valor" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="status"> Status </label>
                            <select 
                                className="form-control" 
                                id="status" 
                                name="status"
                                value={this.state.status}                                    
                                onChange={this.estadoStatus}
                            >   
                                <option value=""> --Selecione-- </option>                                 
                                <option value="Pendente">Pendente</option>
                                <option value="Pago">Pago</option>  
                                <option value="Liquidado">Liquidado</option> 
                                <option value="Vencido"> Vencido </option>
                                <option value="Parcelado"> Parcelado </option>
                            </select>
                        </div>

                        <div className="form-group">
                                {pago} {liquidado}
                        </div>  

                        <div className="form-group">
                            <label htmlFor="formapagamento"> Forma de pagamento </label>
                            <select 
                                className="form-control" 
                                id="formapagamento" 
                                name="formapagamento"
                                value={selecionado}                                    
                                onChange={this.estadoFormaPagamento}                                   
                            >                                    
                                <option value=""> --Selecione-- </option> 
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Boleto">Boleto</option>  
                                <option value="Cartão de Débito">Cartão de Débito</option> 
                                <option value="Cartão de Crédito"> Cartão de Crédito </option>
                                <option value="DOC/TED"> DOC/TED </option>
                            </select>
                        </div>

                        <div className="form-group">
                            {parcelado}
                        </div>

                        <label htmlFor="categoria"> Categoria </label>
                        <div className="actions2">                                
                            <select 
                                className="form-control" 
                                id="categoria" 
                                name="categoria"
                                value={this.state.categoria}                                    
                                onChange={this.estadoCategoria}
                            >     
                            
                                <option value="" disabled>---Selecione---</option>  
                                {catreceitas}                              
                                
                            </select>

                            <button id="plus" onClick={this.showModalCategoria}>+</button>
                            {modalCategoria}                            
                        </div>

                        <div className="form-group">
                            {dizimo}
                        </div>

                        <ul className="pagination">
                            { paginas }
                        </ul>

                        <Container>
                        <Content>
                            <Upload onUpload={this.handleUpload} />
                            {!!uploadedFiles.length && (
                                <FileList files={uploadedFiles} onDelete={this.handleDelete} />
                            )}
                        </Content>
                        <GlobalStyle />
                    </Container>

                    </div>

                    

                    <div className="actions">                
                            <button onClick={this.salvarReceber}>
                                Adicionar
                            </button>
                        </div>
                </div>
            )}
            </div>

        )

    }

}