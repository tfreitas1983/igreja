import React, { Component } from 'react'
import DespesaDataService from "../services/despesa.service"
import FornecedorDataService from "../services/fornecedor.service"
import CategoriaDataService from "../services/categoria.service"
import MembroDataService from "../services/membro.service"
import moment from 'moment'
import { uniqueId } from "lodash";
import filesize from "filesize";
import http from "../http-common"

import GlobalStyle from "../styles/global";
import { Container, Content } from "./styles";

import Upload from "./Upload";
import FileList from "./FileList"

export default class AdicionarPagar extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoValor = this.estadoValor.bind(this)
        this.estadoVencimento = this.estadoVencimento.bind(this)
        this.estadoPagamento = this.estadoPagamento.bind(this)
        this.estadoDataLiquidado = this.estadoDataLiquidado.bind(this)
        this.estadoFornecedor = this.estadoFornecedor.bind(this)
        this.estadoCNPJ = this.estadoCNPJ.bind(this)
        this.estadoCategoria = this.estadoCategoria.bind(this)
        this.estadoTipo = this.estadoTipo.bind(this)
        this.estadoFormaPagamento = this.estadoFormaPagamento.bind(this)
        this.estadoParcelas = this.estadoParcelas.bind(this)
        this.estadoStatus = this.estadoStatus.bind(this)

        this.pegaCategoria = this.pegaCategoria.bind(this)
        this.pegaFornecedor = this.pegaFornecedor.bind(this)

        this.salvarCategoria = this.salvarCategoria.bind(this)
        this.salvarFornecedor = this.salvarFornecedor.bind(this)
        this.salvarPagar = this.salvarPagar.bind(this)
        this.novoPagar = this.novoPagar.bind(this)
        this.limpaEstados = this.limpaEstados.bind(this)


        this.state = {
            descricao: "",
            valor: "",
            vencimento: "",
            dtpagamento: "",
            dtliquidado: "",
            empresas: [],
            razao: "",
            cnpj: "",
            cat: [],
            categoria: "",
            tipo: "despesa",
            formapagamento: "",
            parcelas: "",
            status: "",
            situacao: "",
            showFornecedor: false,
            showCategoria: false,
            uploadedFiles: []
            
        }
    }

    componentDidMount() {
        this.pegaCategoria()
        this.pegaFornecedor()
        
    }

    pegaArquivos() {
        MembroDataService.buscarArquivo()
            .then(response => {
                const uploadedFiles = response.data
                this.setState({
                    uploadedFiles: response.data.map(file => ({
                        id: file._id,
                        name: file.foto,
                        readableSize: filesize(file.size),
                        preview: file.foto, //Verificar depois sobre o URL
                        uploaded: true,
                        url: file.URL.createObjectURL(uploadedFiles) //Verificar depois URL.createObjectURL(imagem)
                    }))
                })
            })
            .catch(e => {
                console.log(e)
            })
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
            return id === uploadedFile.id
              ? { ...uploadedFile, ...data }
              : uploadedFile;
          })
        })
      }

      processUpload = uploadedFile => {
        const data = new FormData();
    
        data.append("file", uploadedFile.file, uploadedFile.name);
    
       
        http                            
          .post("/membros/files", data, {
            onUploadProgress: e => {
              const progress = parseInt(Math.round((e.loaded * 100) / e.total));
    
              this.updateFile(uploadedFile.id, {
                progress
              })
            }
          })
          .then(response => {
            this.updateFile(uploadedFile.id, {
              uploaded: true,
              id: response.data._id,
              url: response.data.url
            });
          })
          .catch(() => {
            this.updateFile(uploadedFile.id, {
              error: true
            })
          })
      }

      handleDelete = async id => {
        await http.delete(`/membros/files/${id}`);
    
        this.setState({
          uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
        })
      }
    
      componentWillUnmount() {
        this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
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

    estadoVencimento(e) {
        const vencimento = e.target.value
        this.setState({
            vencimento: vencimento
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

    estadoFornecedor(e) {
        const razao = e.target.value
        this.setState({
            razao: razao
        }) 
    }

    estadoCategoria(e) {
        const categoria = e.target.value
        this.setState({
            categoria: categoria
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

    estadoCNPJ(e) {
        const cnpj = e.target.value
        this.setState({
            cnpj: cnpj
        })
    }

    estadoTipo(e){
        const tipo = e.target.value
        this.setState({
            tipo: tipo
        })
    }

    pegaFornecedor() {
        FornecedorDataService.buscarTodos()
            .then(response => {
                const empresas = response.data
                this.setState({
                    empresas: response.data
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    pegaCategoria(){
        CategoriaDataService.buscarTodos()
            .then(response => {
                const cat = response.data
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
            tipo: "despesa"
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

    salvarFornecedor(){
        var data = {
            razao: this.state.razao,
            cnpj: this.state.cnpj,
            categoria: this.state.categoria
        }

        FornecedorDataService.cadastrar(data)
            .then(response => {
                this.setState({
                    razao: response.data.razao,
                    cnpj: response.data.cnpj,
                    categoria: response.data.categoria
                })
            })
            .catch(e => {
                console.log(e)
            }) 

        this.pegaFornecedor()
        this.hideModalFornecedor()
       
    }

    salvarPagar() {
        var data = {
            descricao: this.state.descricao,
            valor: this.state.valor,
            vencimento: moment(this.state.vencimento, 'DD/MM/YYYY'),
            status: this.state.status,
            dtpagamento: moment(this.state.dtpagamento, 'DD/MM/YYYY'),
            dtliquidacao: moment(this.state.dtliquidado, 'DD/MM/YYYY'),
            formapagamento: this.state.formapagamento,
            fornecedor: this.state.razao,
            categoria: this.state.categoria,
            parcelas: this.state.parcelas            
        }

        DespesaDataService.cadastrar(data) 
            .then(response => {
                this.setState({
                    id: response.data.id,
                    numdesp: response.data.numdesp,
                    descricao: response.data.descricao,
                    valor: response.data.valor,
                    vencimento: response.data.vencimento,
                    dtpagamento: response.data.dtpagamento,
                    dtliquidacao: response.data.dtliquidacao,
                    formapagamento: response.data.formapagamento,
                    fornecedor: response.data.fornecedor,
                    categoria: response.data.categoria,
                    parcelas: response.data.parcelas,
                    status: response.data.status,
                    situacao: response.data.situacao,
                    submitted: true
                })                
            })
            .catch(e => {
                console.log(e)
            })       
    }

    novoPagar() {
        this.setState({
            descricao: "",
            valor: "",
            vencimento: "",
            dtpagamento: "",
            dtliquidado: "",
            fornecedor: "",
            categoria: "",
            formapagamento: "",
            status: "",
            parcelas: "",
            situacao: ""
        })
    }

    limpaEstados(){
        this.setState({
            dtliquidado: "",
            dtpagamento: ""
        })
    }

    showModalCategoria = () => {
        this.setState({ showCategoria: true })
      }
    
    hideModalCategoria = () => {
        this.setState({ showCategoria: false })
    }

    showModalFornecedor = () => {
        this.setState({ showFornecedor: true })
      }
    
    hideModalFornecedor = () => {
        this.setState({ showFornecedor: false })
    }

        
    render() {

        const {cat, empresas, uploadedFiles } = this.state
       

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

        let filtro = (this.state.cat).filter((item) => {
            return item.tipo === 'despesa'
        })
        
        let catreceitas = filtro.map((categoria, index) => (
           <option value={categoria.categoria} key={index}>{categoria.categoria}</option>
       ))  

        //Mostra o modal de criação de fornecedor
        let modalFornecedor = null
        if(this.state.showFornecedor === true) {
            modalFornecedor = 
                <div className="modal_bg">
                    <div className="modal">
                        <button type="button" className="closeButton" id="closeButton" onClick={this.hideModalFornecedor}>X</button>
                        <h2>Cadastrar Fornecedor</h2>
                        <input 
                            type="text"
                            className="form-control" 
                            id="fornecedor" 
                            required 
                            value={this.state.razao}
                            onChange={this.estadoFornecedor}
                            placeholder="Digite a razão social"/>
                        <input 
                            type="number"
                            className="form-control" 
                            id="cnpj" 
                            required 
                            value={this.state.cnpj}
                            onChange={this.estadoCNPJ}
                            placeholder="Digite o CNPJ"/>
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

                        <button onClick={this.salvarFornecedor} className="btn btn-success">
                            Adicionar
                        </button>
                    </div>
                </div>
        } 
        
        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4> Envio completado com sucesso!</h4>
                        <button className="btn btn-success" onClick={this.novoPagar}>
                            Adicionar
                        </button>
                    </div>
                ) : (                
                    <div>
                        <h4> Cadastrar Despesa </h4>
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
                                    name="descricao" />                                
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
                                    name="valor"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="vencimento"> Vencimento </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="vencimento" 
                                    required 
                                    value={this.state.vencimento} 
                                    onChange={this.estadoVencimento} 
                                    name="vencimento"
                                />
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

                            
                            <label htmlFor="fornecedor"> Fornecedor </label>
                            <div className="actions2">
                                <select 
                                    className="form-control" 
                                    id="fornecedor" 
                                    name="fornecedor"
                                    value={this.state.razao}                                    
                                    onChange={this.estadoFornecedor}
                                >    

                                    <option value="" disabled>---Selecione---</option>                                
                                    {empresas && empresas.map((empresa, index) => (
                                        <option value={empresa.razao} key={index}>{empresa.razao}</option>
                                    ))} 
                                </select>

                                <button id="plus" onClick={this.showModalFornecedor}>+</button>
                                {modalFornecedor}
                            </div>
                        </div>

                        
                        <Container>
                            <Content>
                            <Upload onUpload={this.handleUpload} />
                            {!!uploadedFiles.length && (
                                <FileList files={uploadedFiles} onDelete={this.handleDelete} />
                            )}
                            </Content>
                            <GlobalStyle />
                        </Container>
 

                        <div className="actions">                
                            <button onClick={this.salvarPagar}>
                                Adicionar
                            </button>
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }
}