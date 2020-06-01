import React, { Component } from 'react'


export default class Financeiro extends Component {
    constructor(props) {
        super(props)

        this.pegaDespesas = this.pegaDespesas.bind(this)
        this.pegaReceitas = this.pegaReceitas.bind(this)

        this.state = {

        }
    }

    componentDidMount(){
        this.pegaDespesas()
        this.pegaReceitas()
    }

    pegaDespesas() {
        this.setState({
        
        })
    }

    pegaReceitas() {
        this.setState({
        
        })
    }
        
    render() {

        return (
            <div className="table">
                <h1>Lista de receitas e despesas</h1>
            </div>

        )

    }

}