import React, { Component } from 'react'
import ReceitaDataService from "../services/receita.service"
import MembroDataService from "../services/membro.service"
import CategoriaDataService from "../services/categoria.service"
import moment from 'moment'

export default class EditReceitas extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoValor = this.estadoValor.bind(this)
        this.estadoPagamento = this.estadoPagamento.bind(this)
        this.estadoDataLiquidado = this.estadoDataLiquidado.bind(this)
        this.estadoCategoria = this.estadoCategoria.bind(this)
        this.estadoBuscaNome = this.estadoBuscaNome.bind(this)
        this.estadoFormaPagamento = this.estadoFormaPagamento.bind(this)
        this.estadoParcelas = this.estadoParcelas.bind(this)

        this.estadoTipo = this.estadoTipo.bind(this)
        this.estadoStatus = this.estadoStatus.bind(this)        


        this.buscarNome = this.buscarNome.bind(this)
        this.pegaCategoria = this.pegaCategoria.bind(this)
        this.salvarCategoria = this.salvarCategoria.bind(this)
                
        this.salvarReceber = this.salvarReceber.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)
        this.buscaReceita = this.buscaReceita.bind(this)


        this.state = {
            current:{                
                descricao: "",
                valor: "",
                status: "",
                dtpagamento: moment(),
                dtpagamentonovo: "",
                dtliquidado: moment(),
                dtliquidadonovo: "",
                categoria: "",
                tipo: "receita",
                formapagamento: "",
                parcelas: "",
                situacao: "",                
                currentIndex: -1,
                membro: null
            },
            buscaNome: "",
            membros: [],
            cat: [],
            showCategoria: false            
        }        
    }

    componentDidMount() {
        this.buscaReceita(this.props.match.params.id) 
        this.pegaCategoria()   
    }

    buscaReceita(id) {
        ReceitaDataService.buscarUm(id)
            .then(response => {
                this.setState({
                    current: {
                        id: response.data.id,
                        numrec: response.data.numrec,
                        descricao: response.data.descricao,
                        valor: (response.data.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL',}),                        
                        status: response.data.status,
                        dtpagamento: moment(response.data.dtpagamento).format('DD/MM/YYYY'),
                        dtliquidado: moment(response.data.dtliquidacao).format('DD/MM/YYYY'),
                        formapagamento: response.data.formapagamento,
                        membro: response.data.membro,
                        categoria: response.data.categoria,
                        parcelas: response.data.parcelas,
                        situacao: response.data.situacao
                    }
                })
            })            
            .catch(e => {
                console.log(e)
            })  
    }

    estadoBuscaNome(e) {
        const buscaNome = e.target.value
        this.limpaCurrent()
        this.buscarNome()
        this.setState({
            buscaNome: buscaNome
        })
        
    }

    
    buscarNome() {        
        MembroDataService.buscarNome(this.state.buscaNome)
            .then(response => {
                this.setState({
                    membros: (response.data.docs).map((item) => ( {nome: item.nome} ))
                })                  
            })
            .catch(e => {
                console.log(e)
            })
         
    }
    
    ativaMembro(membro, index) {
        this.setState(prevState => ({
            current: {
                ...prevState.current,
            membro: membro.nome,
            currentIndex: index
            }
        })
    )}

    limpaCurrent() {
        this.setState({
            current: {...this.state.current, membro: null},
            currentIndex: -1
        })
    }

    estadoDescricao(e) {
        const descricao = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 descricao: descricao
            }
        }))
    }

    estadoValor(e) {
        const valor = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 valor: valor
            }
        }))
    }

    estadoStatus(e) {
        const status = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 status: status
            }
        }))  
    }

    estadoPagamento(e) {
        const dtpagamento = e.target.value
        const dtpagamentonovo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 dtpagamento: dtpagamentonovo
            }
        }))
    }

    estadoDataLiquidado(e) {
        const dtliquidado = e.target.value
        const dtliquidadonovo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 dtliquidado: dtliquidadonovo
            }
        }))
    }

    estadoCategoria(e) {
        const categoria = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 categoria: categoria
            }
        }))
    }

    estadoParcelas(e) {
        const parcelas = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 parcelas: parcelas
            }
        }))
    }

    estadoTipo(e) {
        const tipo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 tipo: tipo
            }
        }))
    }

    estadoFormaPagamento(e) {
        const formapagamento = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 formapagamento: formapagamento
            }
        }))
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
            categoria: this.state.current.categoria,
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

    salvarReceber() {

        var data = {
            id: this.state.current.id,
            numrec: this.state.current.numrec,
            descricao: this.state.current.descricao,
            valor: (this.state.current.valor).replace('R$', '').replace(',', '.'),            
            status: this.state.current.status,
            dtpagamento: moment(this.state.current.dtpagamento, 'DD-MM-YYYY'),
            dtliquidacao: moment(this.state.current.dtliquidado, 'DD-MM-YYYY'),
            formapagamento: this.state.current.formapagamento,
            membro: this.state.current.membro,
            categoria: this.state.current.categoria,
            parcelas: this.state.current.parcelas            
        }

        ReceitaDataService.editar(this.state.current.id, data)
        .then(response => {
            this.setState({
                message: "A receita foi alterada com sucesso"
            })
            
        })
        .catch(e => {
            console.log(e)           
        })
    
    }

    atualizaSituacao(estado) {
        var data = {
            id: this.state.current.id,
            numrec: this.state.current.numrec,
            descricao: this.state.current.descricao,
            valor: this.state.current.valor,
            status: this.state.current.status,
            dtpagamento: moment(this.state.current.dtpagamento, 'DD-MM-YYYY'),
            dtliquidacao: moment(this.state.current.dtliquidado, 'DD-MM-YYYY'),
            formapagamento: this.state.current.formapagamento,
            membro: this.state.current.membro,
            categoria: this.state.current.categoria,
            parcelas: this.state.current.parcelas,
            situacao: estado            
        }

        ReceitaDataService.editar(this.state.current.id, data)
            .then(response => {
                this.setState(prevState => ({
                    current: {
                        ...prevState.current,
                        situacao: estado
                    }
                }))

            })
            .catch(e => {
                console.log(e)
            })

    }

    showModalCategoria = (e) => {
        e.preventDefault()
        this.setState({ showCategoria: true })
    }
    
    hideModalCategoria = () => {
        this.setState({ showCategoria: false })
    }

    render () {
        const {membros, current, cat} = this.state

         //Verifica se o status é "Pago" e reinderiza o campo de data de pagamento
         let pago = null
         if(current && current.status === "Pago") {
             pago = <div className="form-group">
                         <label> Data pagamento </label>
                             <input type="text" className="form-control" 
                                 id="dtpagamento" 
                                 required 
                                 value={current.dtpagamento} 
                                 onChange={this.estadoPagamento} 
                                 name="dtpagamento"
                             />
                     </div>
         } 
 
         //Verifica se o status é "Liquidado" e reinderiza o campo de data de liquidação
         let liquidado = null
         if( current && current.status === "Liquidado") {
             pago = 
                 <div className="form-group">
                     <label> Data pagamento </label>
                         <input type="text" className="form-control" id="dtpagamento" required value={current.dtpagamento} onChange={this.estadoPagamento} name="dtpagamento" />
                 </div>
             liquidado = 
                 <div className="form-group">
                     <label> Data de liquidação </label>
                     <input type="text" className="form-control" id="dtliquidado" required value={current.dtliquidado} onChange={this.estadoDataLiquidado} name="dtliquidado" />
                 </div> 
         }
 
         
         //Verifica se o status não é parcelado para liberar as formas de pagamento
         let selecionado = ""
         if(current && current.status !== "Parcelado") {
             selecionado = current.formapagamento
         }
         
         //Verifica se o pagamento é parcelado, reinderiza a quantidade de parcelas
         //e escolhe a forma de pagamento "Cartão de Crédito"
         let parcelado = null
         if(current && current.status === "Parcelado") { 
             selecionado = "Cartão de Crédito"
             parcelado = <div className="form-group">
                             <label> Número de parcelas </label>
                             <select 
                                 className="form-control" 
                                 id="parcelas" 
                                 name="parcelas"
                                 value={current.parcelas}                                    
                                 onChange={this.estadoParcelas}
                             >                                    
                                 <option value=""> --Selecione-- </option> 
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
                                 value={current.categoria}
                                 onChange={this.estadoCategoria}
                                 placeholder="Digite o nome da categoria"/>
                             
                             <button onClick={this.salvarCategoria} className="btn btn-success">
                                 Adicionar
                             </button>
                     </div>
                 </div>
         }
         
         let filtro = (this.state.cat).filter((item) => {
             return item.tipo === 'receita'
         })
         
         let catreceitas = filtro.map((categoria, index) => (
            <option value={categoria.categoria} key={index}>{categoria.categoria}</option>
        ))

        let mostrar = null
        if (current.membro) {
            mostrar =  <div className="autocomplete-items-active">
                {current.membro}
            </div>
        } 
        if (this.state.buscaNome && current.membro === null) {            
            mostrar = 
            <div className="list-group">
           { membros && membros.map((membro, index) => (
                <div className={"autocomplete-items" + (index === current.currentIndex ? "-active" : "")} 
                onClick={() => this.ativaMembro(membro, index)} 
                key={index} > 
                    {membro.nome}
                </div>
            ))}
            </div>
        }
            
        
        let dizimo = null
        if (current && current.categoria === 'Dízimo') {
            dizimo = 
            <div>
                <div className="form-group">
                    <label>Membro</label> 
                </div>
                <div className="actions">
                    <div className="autocomplete">
                        <input type="text"className="form-control" onClick={this.buscarNome} onKeyUp={this.buscarNome} id="membro" name="membro" value={this.state.buscaNome} onChange={this.estadoBuscaNome} /> 
                    </div>                                       
                </div>                                   
                    {mostrar}                                    
            </div>
        }    

        return (
            <div className="list">
                { current ? (
                    <div className="edit-form">
                        <h2>Editar receita #{current.numrec}</h2>
                        <form onSubmit={this.salvarReceber}>
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>
                                <input type="text" className="form-control" id="descricao" value={current.descricao} onChange={this.estadoDescricao} />
                            </div> 

                            <div className="form-group">
                                <label htmlFor="valor">Valor</label>
                                <input type="text" className="form-control" id="valor" value={current.valor} onChange={this.estadoValor} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status"> Status </label>
                                <select 
                                    className="form-control" 
                                    id="status" 
                                    name="status"
                                    value={current.status}                                    
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
                                    value={current.categoria}                                    
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
                            

                        </form>
                        {current.situacao ? (
                            <button className="badge badge-primary mr-2" onClick={() => this.atualizaSituacao(false)}>
                                Inativar
                            </button>
                        ) : (
                            <button className="badge badge-primary mr-2" onClick={() => this.atualizaSituacao(true)}>
                                Ativar
                            </button>
                        )}

                        <button type="submit" className="badge badge-success mr-2" onClick={this.salvarReceber}>
                                Alterar
                        </button>
                
                        <p>{this.state.message}</p>

                    </div>
                    ) : (
                        <div>
                            <br />
                            <p>Selecione um membro...</p>
                        </div>
                    )
                }
            </div>
        )
    }

}