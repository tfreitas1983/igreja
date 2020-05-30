import React, { Component } from 'react'


export default class AdicionarReceber extends Component {
    constructor(props) {
        super(props)

        this.salvarReceber = this.salvarReceber.bind(this)
        this.novoReceber = this.novoReceber.bind(this)

        this.state = {

        }


    }

    salvarReceber(){

    }

    novoReceber() {
        this.setState({
        
        })
    }
        
    render() {

        return (
            <div className="submit-form">
            { this.state.submitted ? (
                <div>
                    <h4> Envio completado com sucesso!</h4>
                    <button className="btn btn-success" onClick={this.novoReceber}>
                        Adicionar
                    </button>
                </div>
            ) : (                
                <div>
                    <h4> Cadastrar Receita </h4>
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
                    </div>
                </div>
            )}
            </div>

        )

    }

}