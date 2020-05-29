import React, { Component } from 'react'
import Modal from './modal.component'

export default class AdicionarPagar extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoValor = this.estadoValor.bind(this)
        this.estadoVencimento = this.estadoVencimento.bind(this)
        this.estadoPagamento = this.estadoPagamento.bind(this)
        this.estadoDataLiquidado = this.estadoDataLiquidado.bind(this)
        this.estadoFornecedor = this.estadoFornecedor.bind(this)
        this.estadoCategoria = this.estadoCategoria.bind(this)
        this.estadoFormaPagamento = this.estadoFormaPagamento.bind(this)
        this.estadoParcelas = this.estadoParcelas.bind(this)
        this.estadoSituacao = this.estadoSituacao.bind(this)

        this.salvarPagar = this.salvarPagar.bind(this)
        this.novoPagar = this.novoPagar.bind(this)
        this.limpaEstados = this.limpaEstados.bind(this)


        this.state = {
            descricao: "",
            valor: "",
            vencimento: "",
            dtpagamento: "",
            dtliquidado: "",
            fornecedor: "",
            categoria: "",
            formapagamento: "",
            parcelas: "",
            situacao: "",
            
        }
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
        const fornecedor = e.target.value
        this.setState({
            fornecedor: fornecedor
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

    estadoSituacao(e) {
        const situacao = e.target.value
        this.setState({
            situacao: situacao
        }) 
        //Se a situação for pago ou liquidado e voltar à pendente
        //deve-se limpar os estados desses campos
        if(situacao === "Pendente") {
            this.limpaEstados()
        }
    }

    salvarPagar(){

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
        
    render() {

        //Verifica se a situação é "Pago" e reinderiza o campo de data de pagamento
        let pago = null
        if(this.state.situacao === "Pago") {
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

        //Verifica se a situação é "Liquidado" e reinderiza o campo de data de liquidação
        let liquidado = null
        if(this.state.situacao === "Liquidado") {
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

        
        //Verifica se a situação não é parcelada para liberar as formas de pagamento
        let selecionado = ""
        if(this.state.situacao !== "Parcelado") {
            selecionado = this.state.formapagamento
        }
        
        //Verifica se o pagamento é parcelado, reinderiza a quantidade de parcelas
        //e escolhe a forma de pagamento "Cartão de Crédito"
        let parcelado = null
        if(this.state.situacao === "Parcelado") { 
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
                                <label htmlFor="vencimento"> Vencimento </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="vencimento" 
                                required 
                                value={this.state.vencimento} 
                                onChange={this.estadoVencimento} 
                                name="vencimento" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="situacao"> Situação </label>
                                <select 
                                    className="form-control" 
                                    id="situacao" 
                                    name="situacao"
                                    value={this.state.situacao}                                    
                                    onChange={this.estadoSituacao}
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

                            <div className="form-group">
                                <label htmlFor="categoria"> Categoria </label>
                                <select 
                                    className="form-control" 
                                    id="categoria" 
                                    name="categoria"
                                    value={this.state.categoria}                                    
                                    onChange={this.estadoCategoria}
                                >                                    
                                    <option value=""> --Selecione-- </option> 
                                    <option value="Energia">Energia</option>
                                    <option value="Água">Água</option>  
                                    <option value="Impostos">Impostos</option> 
                                    <option value="Contador"> Contador </option>
                                    <option value="Obras"> Obras </option>
                                    <option value="Material de Limpeza"> Material de Limpeza </option>
                                    <option value="Despesas Administrativas"> Despesas Administrativas </option>
                                </select>
                            </div>

                            
                            <label htmlFor="fornecedor"> Fornecedor </label>
                            <div className="actions">
                                <select 
                                    className="form-control" 
                                    id="fornecedor" 
                                    name="fornecedor"
                                    value={this.state.fornecedor}                                    
                                    onChange={this.estadoFornecedor}
                                >                                    
                                    <option value=""> --Selecione-- </option> 
                                    <option value="Light">Light</option>
                                    <option value="CEDAE">CEDAE</option>  
                                    <option value="Prefeitura">Prefeitura</option> 
                                    <option value="ABC Contabilidade"> ABC Contabilidade </option>
                                    <option value="ABC Engenharia"> ABC Engenharia </option>
                                    <option value="ABC Mercado"> ABC Mercado </option>
                                    <option value="ABC Papelaria"> ABC Papelaria </option>
                                </select>
                                <div>
                                   <Modal />
                                </div>
                            </div>

                        </div>


                        <button onClick={this.salvarPagar} className="btn btn-success">
                            Adicionar
                        </button>
                    </div>
                    )
                }
            </div>
        )
    }
}