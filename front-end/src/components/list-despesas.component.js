import React, { Component } from 'react'
import DespesaDataService from "../services/despesa.service"
import { Link } from "react-router-dom"
import moment from 'moment'

export default class DespesasLista extends Component {
    constructor(props) {
        super(props)
       
        this.pegaDespesas = this.pegaDespesas.bind(this)

        this.state = {
            despesas: []    
        }

        
    }

    componentDidMount() {
        this.pegaDespesas()
        
        
    }

    pegaDespesas() {
        DespesaDataService.buscarTodos()
            .then(response => {
                const despesas = response.data 
                this.setState({
                    despesas: despesas
                }) 
                this.pegaValores()               
            })
            .catch(e => {
                console.log(e)
            })
            
    }

    pegaValores() {
        const despesas = this.state.despesas
        const valores = despesas.map(function(item, index){
            return item.valor
            }
        )        
        this.setState({
            resultado: valores.reduce(function(prev, next){
                return prev += next
            })        
        })

        const soma = (this.state.resultado).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL',})
        this.setState({
            soma: soma
        })
        

    }

    render(){

        const {despesas, soma, resultado} = this.state
        
        return (
            <div className="table">
                <h1>Despesas</h1>
                <Link to={"/financeiro/despesas/adicionar"} className="btn btn-info">Cadastrar</Link>
                <div className="row">
                    <div className="col-8">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th>Vencimento</th>
                                    <th>Pagamento</th>
                                    <th>Liquidação</th>
                                    <th>Categoria</th>
                                    <th>Fornecedor</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {despesas && despesas.map((despesa, index) => (
                                <tr key={index+0}>
                                    <td key={index+1}>{despesa.numdesp}</td>
                                    <td key={index+2}>{despesa.descricao}</td>
                                    <td key={index+3}>{(despesa.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL',})}</td>
                                    <td key={index+4}>{moment(despesa.vencimento).format('DD/MM/YYYY')}</td>
                                    <td key={index+5}>{moment(despesa.dtpagamento).format('DD/MM/YYYY')}</td>
                                    <td key={index+6}>{moment(despesa.dtliquidacao).format('DD/MM/YYYY')}</td>
                                    <td key={index+7}>{despesa.categoria}</td>
                                    <td key={index+8}>{despesa.fornecedor}</td>
                                    <td>{<Link to={`/financeiro/despesas/${despesa.id}`} id="editar" className="badge badge-warning">Editar</Link>}</td>
                                </tr>
                                ))}
                            </tbody>
                            <tfoot>
                            
                                <tr>
                                    <td>Total</td>
                                    <td>{this.state.soma}
                                    </td>
                                </tr>
                            
                            </tfoot>

                        </table>
                    </div>
                </div>
            </div>

        )
    }

}