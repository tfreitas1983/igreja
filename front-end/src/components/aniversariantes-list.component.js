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
            mes: "",
            resultado:[]
                   
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
      //  const resultado = this.state.resultado

        //Cria um array de objetos com os dados dos membros colocando
        //o mês como propriedade do objeto
        const result = membros.map(function(item, index) {
             return {
                mes:item.dtnascimento.substr(5,2), 
                id: item.id,
                nome: item.nome, 
                dtnascimento: item.dtnascimento, 
                foto: item.foto
            }
        })

        //Fixa um estado no objeto "resultado", que é um 
        //filtro do array de objetos anterior (result) 
        this.setState({resultado: result.filter(function(item) {
            item.dtnascimento = moment(item.dtnascimento).format('DD/MM')
            return mes === item.mes
        })})   
    }

    render(){

        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});

        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpe?g|svg)$/))
        
        let imprimir = null
        if(this.state.resultado.length > 0) {
            imprimir = <button onClick={() => window.print()} className="btn btn-info">Imprimir</button>
        }

        return(
            <div>
                <div className="birth-report">                    
                    <div className="row">
                        <div className="col-md-8">                                
                            <h4> Lista de aniversariantes do mês</h4>                                
                        </div>
                    </div>

                    <div className="noprint">
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

                            <div>
                                {imprimir}
                            </div> 
                            
                        </div>
                    </div>
                </div>

                <div>                    
                    <div className="birth-report-list">
                        
                        {this.state.resultado.map(item => (
                        
                            <article key={item.id}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <img 
                                            src={images[item.foto]}
                                            className="imagem"
                                            alt=""
                                            name="foto" 
                                            id="foto"
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <h4>{item.nome}</h4>
                                    
                                        <h2>{item.dtnascimento}</h2>
                                    </div>
                                </div>                          
                            </article>
                       
                        ))}                            
                    </div>                         
                </div>
            </div>
        )
    }

}