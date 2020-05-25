import React, { Component } from 'react'
import MembroDataService from "../services/membro.service"
import * as moment from 'moment'

export default class AniversarioLista extends Component {
    constructor(props) {
        super(props)
        this.estadoMes = this.estadoMes.bind(this)
        this.pegaMembros = this.pegaMembros.bind(this)
        this.gerarRelatorio = this.gerarRelatorio.bind(this)

        this.state = {
            membros: [],
            mes: ""/*,
            resultado:[]*/
                   
        }

    }

    componentDidMount() {
        this.pegaMembros()
    }

    estadoMes(e) {
        this.setState({
            mes: e.target.value
        })
    }

    pegaMembros() {
        MembroDataService.buscarTodos()
            .then(response => {
                this.setState({
                    membros: response.data
                })               
            })
            .catch(e => {
                console.log(e)
            })
    }

    gerarRelatorio() {
        const membros = this.state.membros
        const mes = this.state.mes
        
        const result = membros.map(function(item, index) {
             return {
                mes:item.dtnascimento.substr(5,2), 
                id: item.id,
                nome: item.nome, 
                dtnascimento: item.dtnascimento, 
                foto: item.foto
            }
        })  
            
        const resultado = result.filter(function(item) {
            item.dtnascimento = moment(item.dtnascimento).format('DD/MM')
          
            if (mes === item.mes)  {
                return ({                                         
                    nome: item.nome, 
                    id: item.id,
                    dtnascimento: item.dtnascimento,
                    foto: item.foto                                       
                })
            }
        })
       console.log(resultado)
   
    }


    render(){

        const resultado = this.state

        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});

        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpe?g|svg)$/))
        

        return(
            <div className="birth-report">

                <div className="row">
                    <div className="col-md-8">
                        <h4> Lista de aniversariantes do mês</h4>
                    </div>
                </div>
                
                <div className="row">

                    <div className="col-md-4">                        
                        <select 
                            className="form-control" 
                            id="mes"
                            value={this.state.mes}
                            onChange={this.estadoMes}>
                            <option value="--">Selecione o mês</option>
                            <option value="01">Janeiro</option>
                            <option value="02">Fevereiro</option>  
                            <option value="03">Março</option> 
                            <option value="04"> Abril </option>
                            <option value="05"> Maio </option>
                            <option value="06">Junho</option>
                            <option value="07"> Julho </option>
                            <option value="08">Agosto</option>
                            <option value="09">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>                            
                        </select>
                    </div>

                    <div className="col-md-3">
                        <button 
                            type="submit" 
                            className="btn btn-success" 
                            onClick={this.gerarRelatorio}>
                        Gerar
                        </button>
                    </div> 
                </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="birth-report-list">
                                
                                <article key={resultado.id}>
                                    <div className="col-md-3">
                                        <img 
                                            src={images[resultado.foto]}
                                            className="imagem"
                                            alt=""
                                            name="foto" 
                                            id="foto"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <strong>{resultado.nome}</strong>
                                    </div>
                                    <div className="col-md-3">
                                        <h5>{resultado.dtnascimento}</h5>
                                    </div>
                                </article>
                               
                            </div>
                        </div>
                    </div>              

            </div>
        )
    }

}