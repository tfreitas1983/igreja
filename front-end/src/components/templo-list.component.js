import React, { Component } from 'react'
import TemploDataService from "../services/templo.service"
import { Link } from "react-router-dom"

export default class TemploLista extends Component {
    constructor(props) {
        super(props)
        this.pegaTemplo = this.pegaTemplo.bind(this)
        this.ativaTemplo = this.ativaTemplo.bind(this)

        this.state = {
            templo: [],
            current: null,
            currentIndex: -1,
            buscaSituacao: ""
        }
    }

    componentDidMount() {
        this.pegaTemplo()
    }


    pegaTemplo() {
        TemploDataService.buscar()
        .then(response => {
            this.setState({
                templo: response.data
            })
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    }



    ativaTemplo(templo, index) {
        this.setState({
            current: templo,
            currentIndex: index
        })
    }

    render() {
        const { templo, current, currentIndex } = this.state
        
        let titulo = null
        if (templo.length > 0) {
            titulo = <h4>Detalhes do templo </h4>
        } else {
            titulo =  <Link to={"/membros/templo/adicionar"} className="btn btn-info">Cadastrar</Link>
        }

        return (
            <div className="list row">
                <div className="col-md-6">
                    {titulo}
                    
                    <ul className="list-group">
                        {templo && templo.map((templo, index) => (
                            <li 
                                className={"list-group-item " + (index === currentIndex ? "active" : "")} 
                                onClick={() => this.ativaTemplo(templo, index)} 
                                key={index} >
                                    {templo.fantasia}
                            </li>
                        )) }
                    </ul>
                </div>

                <div className="col-md-6">
                    {current ? (
                        <div>
                            <div>
                                <label>
                                    <strong>Razão Social: </strong>
                                </label>{" "}
                                    { current.razao }
                            </div>

                            <div>
                                <label>
                                    <strong>Nome Fantasia: </strong>
                                </label>{" "}
                                    { current.fantasia }
                            </div>

                            <div>
                                <label>
                                    <strong>CNPJ: </strong>
                                </label>{" "}
                                    { current.cnpj }
                            </div>

                            <div>
                                <label>
                                    <strong>Inscrição Municipal: </strong>
                                </label>{" "}
                                    { current.inscricao }
                            </div>

                            <div>
                                <label>
                                    <strong>E-mail: </strong>
                                </label>{" "}
                                    { current.email }
                            </div>

                            <div>
                                <label>
                                    <strong>Telefone: </strong>
                                </label>{" "}
                                    { current.telefone }
                            </div>

                            <div>
                                <label>
                                    <strong>Rua: </strong>
                                </label>{" "}
                                    { current.rua }
                            </div>

                            <div>
                                <label>
                                    <strong>Número: </strong>
                                </label>{" "}
                                    { current.num }
                            </div>

                            <div>
                                <label>
                                    <strong>Complemento: </strong>
                                </label>{" "}
                                    { current.complemento }
                            </div>

                            <div>
                                <label>
                                    <strong>Bairro: </strong>
                                </label>{" "}
                                    { current.bairro }
                            </div>

                            <div>
                                <label>
                                    <strong>Cidade: </strong>
                                </label>{" "}
                                    { current.cidade }
                            </div>

                            <div>
                                <label>
                                    <strong>UF: </strong>
                                </label>{" "}
                                    { current.uf }
                            </div>

                            <div>
                                <label>
                                    <strong>CEP: </strong>
                                </label>{" "}
                                    { current.cep }
                            </div>

                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}   
                                { current.situacao ? "Ativo" : "Inativo" }
                            </div>

                            <Link to={"/membros/templo/" + current.id} className="badge badge-warning">
                                    Editar
                            </Link>
                        </div>
                        ) : (
                            <div>
                                <br />
                                <p>Clique no templo para exibir os detalhes...</p>
                            </div>
                        )
                    }
                </div>
            </div>        
        )
    }
}    