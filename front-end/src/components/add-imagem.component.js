import React, { Component } from 'react'
import ImagemDataService from "../services/imagem.service.service"

export default class AdicionarImagem extends Component {
    constructor(props) {
        super(props)        
        this.estadoImagem = this.estadoImagem.bind(this)
        this.salvarImagem = this.salvarImagem.bind(this)

        this.state = {
            id: null,
            nome: "",
            path: ""
        }
    }

    estadoImagem(e) {
        this.setState({
            avatar_id: e.target.files[0],
            loaded: 0
        })
    }

    salvarImagem() {
        var data = {
            nome: this.state.nome,
            path: this.state.path
        }

        ImagemDataService.cadastrarImagem(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        nome: response.data.nome,
                        path: response.data.path
                    })
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
    }


    render() {
        <div className="image-container">
                            <div>
                                <input 
                                    type="file"  
                                    className="upload-btn"
                                    onChange={this.estadoImagem} 
                                />
                            </div>
                            <div>
                                <img 
                                    src={`http://localhost:8080/api/membros/files/5ebaba02d49c8f07bcd468b0`} 
                                    className="imagem"
                                    alt="Busque a foto" />
                            </div>
                            <button onClick={this.salvarImagem} className="btn btn-success">
                                Enviar
                            </button>
                        </div>
    }

}