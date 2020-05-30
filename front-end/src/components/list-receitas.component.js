import React, { Component } from 'react'
import ReceitaDataService from "../services/receita.service"
import { Link } from "react-router-dom"

export default class ReceitasLista extends Component {
    constructor(props) {
        super(props)
       

        this.state = {
            
        }
    }

    render(){

        return(
            <div className="list">
                <h1>Receitas</h1>
                <Link to={"/financeiro/receitas/adicionar"} className="btn btn-info">Cadastrar</Link>
            </div>

        )
    }

}