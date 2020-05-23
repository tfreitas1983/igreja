import React, { Component } from 'react'
import MembroDataService from "../services/membro.service"
import { Link } from "react-router-dom"
import * as moment from 'moment'


export default class MembrosLista extends Component {
    constructor(props) {
        super(props)
        this.estadoBuscaNome = this.estadoBuscaNome.bind(this)
        this.pegaMembros = this.pegaMembros.bind(this)
        this.atualizaLista = this.atualizaLista.bind(this)
        this.ativaMembro = this.ativaMembro.bind(this)
        this.removeTodos = this.removeTodos.bind(this)
        this.buscaNome = this.buscaNome.bind(this)
        this.apagaMembro = this.apagaMembro.bind(this)

        this.state = {
            membros: [],
            currentMembro: null,
            currentIndex: -1,
            buscaNome: ""
        }
    }

    componentDidMount() {
        this.pegaMembros()
    }

    estadoBuscaNome(e) {
        const buscaNome = e.target.value

        this.setState({
            buscaNome: buscaNome
        })
    }

    pegaMembros() {
        MembroDataService.buscarTodos()
            .then(response => {
                this.setState({
                    membros: response.data
                })
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    atualizaLista() {
        this.pegaMembros()
        this.setState({
            currentMembro: null,
            currentIndex: -1
        })
    }

    ativaMembro(membro, index) {
        this.setState({
            currentMembro: membro,
            currentIndex: index
        })
    }

    removeTodos() {
        MembroDataService.apagarTodos()
            .then(response => {
                console.log(response.data)
                this.atualizaLista()
            })
            .catch(e => {
                console.log(e)
            })
    }

    buscaNome() {
        MembroDataService.buscarNome(this.state.buscaNome)
            .then(response => {
                this.setState({
                    membros: response.data
                })
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    apagaMembro() {
        MembroDataService.apagar(this.state.currentMembro.id)
            .then(response => {
                this.props.history.push('/membros')
                this.atualizaLista()
            })
            
            .catch(e => {
                console.log(e)
            })                    
    }

    render() {
        const { buscaNome, membros, currentMembro, currentIndex } = this.state

        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});

        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpe?g|svg)$/))



        return (
            <div className="list row">

                <div className="col-md-8">
                    
                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Busque pelo nome" 
                            value={buscaNome} 
                            onChange={this.estadoBuscaNome} />
                        
                        <div className="input-group-append">
                            <button 
                                className="btn btn-outline-secondary" 
                                type="button" 
                                onClick={this.buscaNome}>
                                    Buscar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <h4>Lista de membros</h4>
 
                    <ul className="list-group">
                        {membros && membros.map((membro, index) => (
                            <li 
                                className={"list-group-item " + (index === currentIndex ? "active" : "")} 
                                onClick={() => this.ativaMembro(membro, index)} 
                                key={index} >
                                    {membro.nome}
                            </li>
                        )) }
                    </ul>

                    <button className="m-3 btn btn-sm btn-danger" onClick={this.removeTodos} >
                        Apagar todos
                    </button>
                </div>

                <div className="col-md-6">
                    {currentMembro ? (
                    
                        <div>
                            <img 
                                src={images[currentMembro.foto]}
                                className="imagem"
                                alt=""
                                name="foto" 
                                id="foto"
                            />

                            <h4> {currentMembro.nome} </h4>
                            
                            <div>
                                <label>
                                    <strong>Data de nascimento: </strong>
                                </label>{" "}
                                 {moment(currentMembro.dtnascimento).format('DD/MM/YYYY')}
                            </div>

                            <div>
                                <label>
                                    <strong>Sexo: </strong>
                                </label>{" "}
                                { currentMembro.sexo }
                            </div>

                            <div>
                                <label>
                                    <strong>Telefone: </strong>
                                </label>{" "}
                                { currentMembro.telefone }
                            </div>
                
                            <div>
                                <label>
                                    <strong>Rua:</strong>
                                </label>{" "}
                                { currentMembro.rua }
                            </div>
                            
                            <div>
                                <label>
                                    <strong>Número:</strong>
                                </label>{" "}
                                { currentMembro.num }
                            </div>

                            <div>
                                <label>
                                    <strong>Complemento:</strong>
                                </label>{" "}
                                { currentMembro.complemento }
                            </div>

                            <div>
                                <label>
                                    <strong>Bairro:</strong>
                                </label>{" "}
                                { currentMembro.bairro }
                            </div>
                            
                            <div>
                                <label>
                                    <strong>Cidade:</strong>
                                </label>{" "}
                                { currentMembro.cidade }
                            </div>
                            
                            <div>
                                <label>
                                    <strong>UF:</strong>
                                </label>{" "}
                                { currentMembro.uf }
                            </div>
                            
                            <div>
                                <label>
                                    <strong>CEP:</strong>
                                </label>{" "}
                                { currentMembro.cep }
                            </div>
                            
                            <div>
                                <label>
                                    <strong>Membro desde:</strong>
                                </label>{" "}
                               {moment(currentMembro.membro_desde).format('DD/MM/YYYY')}
                            </div>
                            
                            <div>
                                <label>
                                    <strong>Cargo:</strong>
                                </label>{" "}
                                    {currentMembro.cargo}
                            </div>
                            
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}   
                                { currentMembro.situacao ? "Ativo" : "Inativo" }
                            </div>

                            <Link to={"/membros/" + currentMembro.id} className="badge badge-warning">
                                Editar
                            </Link>

                            <button id="apagar" className="badge badge-danger mr-2" onClick={this.apagaMembro}>
                                Apagar
                            </button>
                        </div>
                        ) : (
                            <div>
                                <br />
                                <p>Clique em um membro...</p>
                            </div>
                    )}
                </div>
            </div>
        )
    }
}