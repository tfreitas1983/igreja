import React, { Component } from 'react'
import DespesaDataService from "../services/despesa.service"
import { Link } from "react-router-dom"

export default class DespesasLista extends Component {
    constructor(props) {
        super(props)
       

        this.state = {
            
        }
    }

    render(){

        return(
            <div className="list">
                <h1>Despesas</h1>
                <Link to={"/financeiro/despesas/adicionar"} className="btn btn-info">Cadastrar</Link>
            </div>

        )
    }

}