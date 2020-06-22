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
        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this) 
        this.limpaCurrent = this.limpaCurrent.bind(this)
        this.selecionaPagina = this.selecionaPagina.bind(this)

        this.state = {
            membros: [],
            info: {},
            page: 1,
            currentMembro: null,
            currentIndex: -1,
            selectedPage: null,
            buscaNome: ""
        }
    }

    componentDidMount() {
        this.pegaMembros()        
    }

    estadoBuscaNome(e) {
        const buscaNome = e.target.value
        this.buscaNome()
        this.limpaCurrent()
        this.setState({
            buscaNome: buscaNome
        })
    }

    limpaCurrent() {
        this.setState({
            currentMembro: null,
            currentIndex: -1,
            selectedPage: null,
            buscaNome: ""            
        })
    }

    prevPage = () => {
        const { page } = this.state;
        if (page === 1) return;
        const pageNumber = page - 1;
        this.pegaMembros(pageNumber) 
        this.limpaCurrent()
    }

    nextPage = () => {
        const { page, info } = this.state;
        if (page === info.pages) return; //.pages é a última pagina e o return não faz nada
        const pageNumber = page + 1;
        this.pegaMembros(pageNumber)
        this.limpaCurrent()     
    }

    selecionaPagina(e) {
        const i = e.target.id
        const selectedPage = e.target.id
         this.setState({
            selectedPage: i,
            page: selectedPage
        })
        if(!this.state.buscaNome) {
            this.pegaMembros(selectedPage) 
            this.limpaCurrent()        
        }
        if (this.state.buscaNome) {
            this.buscaNome(selectedPage)
        }
        
    }   

    pegaMembros(page = 1) {        
        MembroDataService.buscarTodos(page)
            .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do membro e "info" com os dados das páginas
                const { docs, ...info } = response.data 
                this.setState({
                    membros: docs,
                    info: info,
                    page: page
                })                
            })
            .catch(e => {
                console.log(e)
            })
    }

    buscaNome(page = 1) {
        MembroDataService.buscarNome(this.state.buscaNome, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    membros: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
    }

    atualizaLista() {
        this.pegaMembros()
        this.limpaCurrent()
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
                this.atualizaLista()
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
        const { buscaNome, membros, info, page, currentMembro, currentIndex} = this.state

        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next)
            return acc
          }, {})

        const images = importAll(
            require.context('../images', false, /\.(png|gif|tiff|jpe?g|svg)$/)
            )

        //Reinderiza os números das páginas de acordo com o total delas
        //Deixando selecionado a página corrente no array paginas
        let i = 0
        let paginas = []
        for ( i = 1; i <= info.pages; i++ ) {
            paginas.push(
                <li className={"page-item " + (page === i ? "active" : "")} key={i}>
                    <span className="page-link" key={i} id={i} onClick={this.selecionaPagina} >
                        {i}
                    </span>
                </li>
            )            
        } 
                
        let mostrar = null
        if (currentMembro !== null) {
            mostrar =  <div className="autocomplete-items-active">
                {currentMembro.nome}
                {<Link to={`/membros/${currentMembro.id}`} id="editar" className="autocomplete-items">Editar</Link>}
            </div>
        } 
        if (currentMembro === null || buscaNome === '') {            
            mostrar = 
            <div className="list-group">
           { membros && membros.map((membro, index) => (
                <div className={"autocomplete-items" + (index === currentIndex ? "-active" : "")} 
                onClick={() => this.ativaMembro(membro, index)} 
                key={index} > 
                    {membro.nome}
                    {<Link to={`/membros/${membro.id}`} id="editar" className="autocomplete-items">Editar</Link>}
                </div>
            ))}
            </div>
        }
       
        let autocomplete = null
        if (membros) {
            autocomplete = 
            <div>
                <div className="actions">
                    <div className="autocomplete">
                        <input 
                        type="text"
                        className="autocomplete" 
                        placeholder={"Digite o nome do membro"} 
                        onClick={this.buscaNome} 
                        onKeyUp={this.buscaNome} 
                        id="membro" 
                        name="membro" 
                        value={this.state.buscaNome} 
                        onChange={this.estadoBuscaNome}
                        autoComplete="off" /> 
                    </div>                                       
                </div>                                   
                    {mostrar}                                    
            </div>
        }   

        return (
            <div className="list row">

                <div className="col-md-6">
                    <h4>Lista de membros</h4>
                    {autocomplete}

                    <div className="actions">
                        <button disabled={page === 1} onClick={this.prevPage}>
                            Anterior
                        </button>
                        
                        <ul className="pagination">
                        { paginas }
                        </ul>
                        
                        <button disabled={page === info.pages} onClick={this.nextPage}>
                            Próxima
                        </button>
                    </div>

                    <div className="actions2">
                  
                        <Link to={"/membros/adicionar"} className="btn btn-info">Cadastrar</Link>

                        <button className="m-2 btn btn-md btn-danger" onClick={this.removeTodos} >
                            Apagar todos
                        </button>
                    </div>
                    
                </div>

                <div className="col-md-6">
                    {currentMembro ? (
                    
                        <div className="imagem">
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