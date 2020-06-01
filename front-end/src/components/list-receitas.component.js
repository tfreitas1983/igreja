import React, { Component } from 'react'
import ReceitaDataService from "../services/receita.service"
import { Link } from "react-router-dom"
import moment from 'moment'

export default class ReceitasLista extends Component {
    constructor(props) {
        super(props)
        this.pegaReceitas = this.pegaReceitas.bind(this)       

        this.state = {
            receitas: []
        }
    }

    componentDidMount() {
        this.pegaReceitas()        
    }

    pegaReceitas() {
        ReceitaDataService.buscarTodos()
            .then(response => {
                const receitas = response.data 
                this.setState({
                    receitas: receitas
                }) 
                this.pegaValores()               
            })
            .catch(e => {
                console.log(e)
            })            
    }

    pegaValores() {
        const receitas = this.state.receitas
        const filtro = receitas.filter(function(item) {
            return item.situacao === true
        })

        this.setState({
            filtro: filtro
        })
        
        const valores= filtro.map(function(item, index) {
            return item.valor
            }            
        )        
        
        const resultado = valores.reduce(function(prev, next){
             return prev += next
        })
       

        const soma = resultado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL',})
        this.setState({
            soma: soma
        })
    }

    render() {

        const {receitas, soma, filtro} = this.state

        return(
            <div className="table">                
                <h1>Receitas</h1>
                <Link to={"/financeiro/receitas/adicionar"} className="btn btn-info">Cadastrar</Link>
                <div className="row">
                    <div className="col-8">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>                                    
                                    <th>Pagamento</th>
                                    <th>Liquidação</th>
                                    <th>Categoria</th>
                                    <th>Membro</th>
                                    <th>Status</th>
                                    <th>Situação</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtro && filtro.map((receita, index) => (

                                <tr key={index+0}>
                                    <td key={index+1}>{receita.numrec}</td>
                                    <td key={index+2}>{receita.descricao}</td>
                                    <td key={index+3}>{(receita.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL',})}</td>
                                    <td key={index+5}>{moment(receita.dtpagamento).format('DD/MM/YYYY')}</td>
                                    <td key={index+6}>{moment(receita.dtliquidacao).format('DD/MM/YYYY')}</td>
                                    <td key={index+7}>{receita.categoria}</td>
                                    <td key={index+8}>{receita.membro}</td>
                                    <td key={index+9}>{receita.status}</td>
                                    <td key={index+'a'}>{receita.situacao ? 'Ativo' : 'Inativo'}</td>
                                    <td>{<Link to={`/financeiro/receitas/${receita.id}`} id="editar" className="badge badge-warning">Editar</Link>}</td>
                                </tr>
                                ))}
                            </tbody>
                            <tfoot>                            
                                <tr>
                                    <td>Total</td>
                                    <td>{soma}
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