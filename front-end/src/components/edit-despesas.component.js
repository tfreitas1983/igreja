import React, { Component } from 'react'
import DespesaDataService from "../services/despesa.service"
import FornecedorDataService from "../services/fornecedor.service"
import CategoriaDataService from "../services/categoria.service"
import moment from 'moment'

export default class EditDespesas extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoValor = this.estadoValor.bind(this)
        this.estadoVencimento = this.estadoVencimento.bind(this)
        this.estadoPagamento = this.estadoPagamento.bind(this)
        this.estadoDataLiquidado = this.estadoDataLiquidado.bind(this)
        this.estadoCategoria = this.estadoCategoria.bind(this)
        this.estadoFornecedor = this.estadoFornecedor.bind(this)
        this.estadoFormaPagamento = this.estadoFormaPagamento.bind(this)
        this.estadoParcelas = this.estadoParcelas.bind(this)
        this.estadoCNPJ = this.estadoCNPJ.bind(this)
        this.estadoTipo = this.estadoTipo.bind(this)
        this.estadoStatus = this.estadoStatus.bind(this)        

        this.pegaCategoria = this.pegaCategoria.bind(this)
        this.pegaFornecedor = this.pegaFornecedor.bind(this)
        this.salvarCategoria = this.salvarCategoria.bind(this)
        this.salvarFornecedor = this.salvarFornecedor.bind(this)
        this.salvarPagar = this.salvarPagar.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)
        this.buscaDespesa = this.buscaDespesa.bind(this)


        this.state = {
            current:{                
                descricao: "",
                valor: "",
                vencimento: moment(),
                vencimentonovo: "",
                status: "",
                dtpagamento: moment(),
                dtpagamentonovo: "",
                dtliquidado: moment(),
                dtliquidadonovo: "",                
                razao: "",
                cnpj: "",                
                categoria: "",
                tipo: "despesa",
                formapagamento: "",
                parcelas: "",
                situacao: ""
            },
            empresas: [],
            cat: [],
            showCategoria: false,
            showFornecedor: false
        }        
    }

    componentDidMount() {
        this.buscaDespesa(this.props.match.params.id) 
        this.pegaCategoria()   
        this.pegaFornecedor()
    }

    buscaDespesa (id) {
        DespesaDataService.buscarUm(id)
            .then(response => {
                this.setState({
                    current: {
                        id: response.data.id,
                        numdesp: response.data.numdesp,
                        descricao: response.data.descricao,
                        valor: response.data.valor,
                        vencimento: moment(response.data.vencimento).format('DD/MM/YYYY'),
                        status: response.data.status,
                        dtpagamento: moment(response.data.dtpagamento).format('DD/MM/YYYY'),
                        dtliquidado: moment(response.data.dtliquidacao).format('DD/MM/YYYY'),
                        formapagamento: response.data.formapagamento,
                        fornecedor: response.data.fornecedor,
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

    estadoVencimento(e) {
       // const vencimento = e.target.value
        const vencimentonovo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 vencimento: vencimentonovo
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
       // const dtpagamento = e.target.value
        const dtpagamentonovo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 dtpagamento: dtpagamentonovo
            }
        }))
    }

    estadoDataLiquidado(e) {
       // const dtliquidado = e.target.value
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

    estadoFornecedor(e) {
        const razao = e.target.value
        const fornecedor = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 razao: razao,
                 fornecedor: fornecedor
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

    estadoParcelas(e) {
        const parcelas = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 parcelas: parcelas
            }
        }))
    }


    estadoCNPJ(e) {
        const cnpj = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 cnpj: cnpj
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


    pegaFornecedor() {
        FornecedorDataService.buscarTodos()
            .then(response => {
              //  const empresas = response.data
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
                //const cat = response.data
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
            razao: this.state.current.razao,
            cnpj: this.state.current.cnpj,
            categoria: this.state.current.categoria
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
            id: this.state.current.id,
            numdesp: this.state.current.numdesp,
            descricao: this.state.current.descricao,
            valor: (this.state.current.valor).replace('R$', '').replace(',', '.'),
            vencimento: moment(this.state.current.vencimento, 'DD-MM-YYYY'),
            status: this.state.current.status,
            dtpagamento: moment(this.state.current.dtpagamento, 'DD-MM-YYYY'),
            dtliquidacao: moment(this.state.current.dtliquidado, 'DD-MM-YYYY'),
            formapagamento: this.state.current.formapagamento,
            fornecedor: this.state.current.razao,
            categoria: this.state.current.categoria,
            parcelas: this.state.current.parcelas            
        }

        DespesaDataService.editar(this.state.current.id, data)
        .then(response => {
            this.setState({
                message: "A despesa foi alterada com sucesso"
            })
            
        })
        .catch(e => {
            console.log(e)           
        })
    
    }

    atualizaSituacao(estado) {
        var data = {
            id: this.state.current.id,
            numdesp: this.state.current.numdesp,
            descricao: this.state.current.descricao,
            valor: this.state.current.valor,
            vencimento: moment(this.state.current.vencimento, 'DD-MM-YYYY'),
            status: this.state.current.status,
            dtpagamento: moment(this.state.current.dtpagamento, 'DD-MM-YYYY'),
            dtliquidacao: moment(this.state.current.dtliquidado, 'DD-MM-YYYY'),
            formapagamento: this.state.current.formapagamento,
            fornecedor: this.state.current.razao,
            categoria: this.state.current.categoria,
            parcelas: this.state.current.parcelas,
            situacao: estado            
        }

        DespesaDataService.editar(this.state.current.id, data)
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

    showModalFornecedor = (e) => {
        e.preventDefault()
        this.setState({ showFornecedor: true })
    }
    
    hideModalFornecedor = () => {
        this.setState({ showFornecedor: false })
    }

    

    render(){

        const {current, empresas} = this.state
        
        
        
        //Verifica se o status é "Pago" e reinderiza o campo de data de pagamento
        let pago = null
        if(current.status === "Pago") {
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
        if(current.status === "Liquidado") {
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
        if(current.status !== "Parcelado") {
            selecionado = current.formapagamento
        }
        
        //Verifica se o pagamento é parcelado, reinderiza a quantidade de parcelas
        //e escolhe a forma de pagamento "Cartão de Crédito"
        let parcelado = null
        if(current.status === "Parcelado") { 
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
                            value={current.razao}
                            onChange={this.estadoFornecedor}
                            placeholder="Digite a razão social"/>
                        <input 
                            type="number"
                            className="form-control" 
                            id="cnpj" 
                            required 
                            value={current.cnpj}
                            onChange={this.estadoCNPJ}
                            placeholder="Digite o CNPJ"/>
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

                        <button onClick={this.salvarFornecedor} className="btn btn-success">
                            Adicionar
                        </button>
                    </div>
                </div>
        } 

        
        return (
            <div className="table">
                { current ? (
                    <div className="edit-form">
                        <h2>Editar despesa #{current.numdesp}</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>
                                <input type="text" className="form-control" id="descricao" value={current.descricao} onChange={this.estadoDescricao} />
                            </div> 

                            <div className="form-group">
                                <label htmlFor="valor">Valor</label>
                                <input type="text" className="form-control" id="valor" value={current.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL',})} onChange={this.estadoValor} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="vencimento">Vencimento</label>
                                <input type="text" className="form-control" id="vencimento" value={current.vencimento} onChange={this.estadoVencimento} />
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

                            
                            <label htmlFor="fornecedor"> Fornecedor </label>
                            <div className="actions2">
                                <select 
                                    className="form-control" 
                                    id="fornecedor" 
                                    name="fornecedor"
                                    value={current.fornecedor}                                    
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

                        <button type="submit" className="badge badge-success mr-2" onClick={this.salvarPagar}>
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