import React, { Component } from "react"
import MembroDataService from "../services/membro.service"
import * as moment from 'moment'


export default class Membro extends Component {
    constructor(props){ 
        super(props)
        this.estadoNome = this.estadoNome.bind(this)
        this.estadoDtNascimento = this.estadoDtNascimento.bind(this)
        this.estadoSexo = this.estadoSexo.bind(this)
        this.estadoTelefone = this.estadoTelefone.bind(this)
        this.estadoRua = this.estadoRua.bind(this)
        this.estadoNum = this.estadoNum.bind(this)
        this.estadoComplemento = this.estadoComplemento.bind(this)
        this.estadoBairro = this.estadoBairro.bind(this)
        this.estadoCidade = this.estadoCidade.bind(this)
        this.estadoUf = this.estadoUf.bind(this)
        this.estadoCep = this.estadoCep.bind(this)
        this.estadoMembro_Desde = this.estadoMembro_Desde.bind(this)
        this.estadoCargo = this.estadoCargo.bind(this)
        this.estadoUpload = this.estadoUpload.bind(this)

        this.salvarImagem = this.salvarImagem.bind(this)
        this.buscaMembro = this.buscaMembro.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)
        this.atualizaMembro = this.atualizaMembro.bind(this)
        this.apagaMembro = this.apagaMembro.bind(this)
        this.estadoSelectCargo = this.estadoSelectCargo.bind(this)
        this.estadoDtNascimentoNovo = this.estadoDtNascimentoNovo.bind(this)
        this.estadoMembro_Desde_Novo = this.estadoMembro_Desde_Novo.bind(this)
        
        this.state = {
            currentMembro: {
                id: null,
                nome: "",                
                dtnascimento: moment(),
                dtnascimentonovo: "",
                sexo: "",
                telefone: "",
                rua: "",
                num: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "",
                cep: "",
                membro_desde: moment(),
                membro_desde_novo: "",
                cargo: "",
                selectedCargo: "",
                foto: "",
                imagem: "",
                url: "",
                situacao: false
              },
                message: "",
        }
    }    

    componentDidMount() {
        this.buscaMembro(this.props.match.params.id)
    }

    estadoUpload(e) {
        const imagem = e.target.files[0]
        const foto =  e.target.files[0].name
       
        this.setState(prevState => ({
            imagem: imagem,
            url: URL.createObjectURL(imagem),
            currentMembro: {
                ...prevState.currentMembro,
                    foto: foto
                     
            }
        }))
    }
            
    estadoNome(e) {
        const nome = e.target.value
        this.setState(function(prevState) {
            return {
                currentMembro: {
                    ...prevState.currentMembro,
                    nome: nome
                }
            }
        })
    }

    estadoDtNascimento(e) {
        const dtnascimento = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                 dtnascimento: dtnascimento
            }
        }))
    }

    estadoDtNascimentoNovo(e) {
        const dtnascimentonovo = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                 dtnascimento: dtnascimentonovo
            }
        }))
    }
    

    estadoSexo(e) {
        const sexo = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                sexo : sexo
            }
        }))
    }

    
    estadoTelefone(e) {
        const telefone = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                telefone: telefone
            }
        }))
    }

    estadoRua(e) {
        const rua = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                rua: rua
            }
        }))
    }

    estadoNum(e) {
        const num = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                num: num
            }
        }))
    }

    estadoComplemento(e) {
        const complemento = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                complemento: complemento
            }
        }))
    }

    estadoBairro(e) {
        const bairro = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                bairro: bairro
            }
        }))
    }
    
    estadoCidade(e) {
        const cidade = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                cidade: cidade
            }
        }))
    }

    estadoUf(e) {
        const uf = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                uf: uf
            }
        }))
    }

    estadoCep(e) {
        const cep = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                cep: cep
            }
        }))
    }

    estadoMembro_Desde(e) {
        const membro_desde = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                membro_desde: membro_desde
            }
        }))
    }

    estadoMembro_Desde_Novo(e) {
        const membro_desde_novo = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                membro_desde: membro_desde_novo
            }
        }))
    }


    estadoCargo(e) {
        const cargo = e.target.value        
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                cargo: cargo
            }
        }))
    }

    estadoSelectCargo (e) {
        const selectedCargo = e.target.value
        this.setState(prevState => ({
            currentMembro: {
                ...prevState.currentMembro,
                cargo: selectedCargo
            }
        }))
    }

    buscaMembro(id) {
        MembroDataService.buscarUm(id)
            .then(response => {
                this.setState({
                    currentMembro: {
                        id: response.data.id,
                        nome: response.data.nome,
                        dtnascimento: moment(response.data.dtnascimento).format('DD/MM/YYYY'),
                        sexo: response.data.sexo,
                        telefone: response.data.telefone,
                        rua: response.data.rua,
                        num: response.data.num,
                        complemento: response.data.complemento,
                        bairro: response.data.bairro,
                        cidade: response.data.cidade,
                        uf: response.data.uf,
                        cep: response.data.cep,
                        membro_desde: moment(response.data.membro_desde).format('DD/MM/YYYY'),
                        cargo: response.data.cargo,
                        foto: response.data.foto,
                        situacao: response.data.situacao                     
                    }
                })
            })
            .catch(e => {
                console.log(e)
            })    
    }

    salvarImagem() {
        if(!this.state.imagem) {
            this.atualizaMembro()  
        } else {
        var data = new FormData()
        data.append('file', this.state.imagem)
               
            MembroDataService.cadastrarImagem(data)
                        .then(response => {
                            this.setState(prevState => ({
                                currentMembro: {
                                    ...prevState.currentMembro,
                                    foto: response.data.foto
                                }
                            }))
                            this.atualizaMembro()
                        })
                        .catch(e => {
                            console.log(e)
                        })
       }
    }

    atualizaSituacao(status) {
        var data = {
            id: this.state.currentMembro.id,
            nome: this.state.currentMembro.nome,
            dtnascimento: moment(this.state.currentMembro.dtnascimento, 'DD-MM-YYYY'),
            sexo: this.state.currentMembro.sexo,
            telefone: this.state.currentMembro.telefone,
            rua: this.state.currentMembro.rua,
            num: this.state.currentMembro.num,
            complemento: this.state.currentMembro.complemento,
            bairro: this.state.currentMembro.bairro,
            cidade: this.state.currentMembro.cidade,
            uf: this.state.currentMembro.uf,
            cep: this.state.currentMembro.cep,
            membro_desde: moment(this.state.currentMembro.membro_desde, 'DD-MM-YYYY'),
            cargo: this.state.currentMembro.cargo,
            foto: this.state.currentMembro.foto,
            situacao: status
        }

        MembroDataService.editar(this.state.currentMembro.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentMembro: {
                        ...prevState.currentMembro,
                        situacao: status
                    }
                }))

            })
            .catch(e => {
                console.log(e)
            })
    }

    atualizaMembro() {
        
        
        var data = {
            id: this.state.currentMembro.id,
            nome: this.state.currentMembro.nome,
            dtnascimento: moment(this.state.currentMembro.dtnascimento, 'DD-MM-YYYY'),
            sexo: this.state.currentMembro.sexo,
            telefone: this.state.currentMembro.telefone,
            rua: this.state.currentMembro.rua,
            num: this.state.currentMembro.num,
            complemento: this.state.currentMembro.complemento,
            bairro: this.state.currentMembro.bairro,
            cidade: this.state.currentMembro.cidade,
            uf: this.state.currentMembro.uf,
            cep: this.state.currentMembro.cep,
            membro_desde: moment(this.state.currentMembro.membro_desde, 'DD-MM-YYYY'),
            cargo: this.state.currentMembro.cargo,
            foto: this.state.currentMembro.foto
        }

        MembroDataService.editar( this.state.currentMembro.id, data )
            .then(response => {
                this.setState({
                    message: "O membro foi alterado com sucesso"
                })

            })
            .catch(e => {
                console.log(e)
            })
    }    

    apagaMembro() {
        MembroDataService.apagar(this.state.currentMembro.id)
            .then(response => {

                this.props.history.push('/membros')
            })
            .catch(e => {
                console.log(e)
            })                    
    }

    

    render() {
        const { currentMembro } = this.state


        //Pega os nomes dos arquivos
        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});
        // Constante que pega todas as imagens da pasta images
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpe?g|svg)$/))
        
        
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url && currentMembro.foto.length < 30) {
            $imagePreview = <img alt ="" src={this.state.url} />
        } if(currentMembro.foto.length > 30) {
            $imagePreview = <img alt ="" src={images[currentMembro.foto]} />
        }

        
        return (
        <div>
            { currentMembro ? (
                <div className="edit-form">
                    <h4>Membro</h4>
                    <form>
                        <div className="image-container">

                            <div className="envio">
                                {$imagePreview}
                            </div>
                            
                            <div className="envio">
                                <input 
                                    type="file"  
                                    className="upload-btn"
                                    onChange={this.estadoUpload} 
                                /> 
                            </div>

                        </div>

                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" value={currentMembro.nome} onChange={this.estadoNome} />
                        </div>    

                        <div className="form-group">
                            <label htmlFor="dtnascimento">Data de nascimento</label>
                            <input
                            className="form-control"
                            id="dtnascimento"
                            value={currentMembro.dtnascimento}
                            onChange={this.estadoDtNascimentoNovo} />
                            
                        </div>

                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sexo"
                                    id="sexoFeminino"
                                    value="Feminino"
                                    checked={currentMembro.sexo === 'Feminino'}
                                    onChange={this.estadoSexo} />
                            </div>
                            <label className="form-check-label">Feminino</label>

                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sexo"
                                    id="sexoMasculino"
                                    value="Masculino"
                                    checked={currentMembro.sexo === 'Masculino'}
                                    onChange={this.estadoSexo} />
                            </div>
                            <label className="form-check-label">Masculino</label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefone">Telefone</label>
                            <input type="text" className="form-control" id="telefone" value={currentMembro.telefone} onChange={this.estadoTelefone} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rua">Rua</label>
                            <input type="text" className="form-control" id="rua" value={currentMembro.rua} onChange={this.estadoRua} />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="num">Número</label>
                            <input type="text" className="form-control" id="num" value={currentMembro.num} onChange={this.estadoNum} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="complemento">Complemento</label>
                            <input type="text" className="form-control" id="complemento" value={currentMembro.complemento} onChange={this.estadoComplemento} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bairro">Bairro</label>
                            <input type="text" className="form-control" id="bairro" value={currentMembro.bairro} onChange={this.estadoBairro} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <input type="text" className="form-control" id="cidade" value={currentMembro.cidade} onChange={this.estadoCidade} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="uf">UF</label>
                            <input type="text" className="form-control" id="uf" value={currentMembro.uf} onChange={this.estadoUf} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cep">CEP</label>
                            <input type="text" className="form-control" id="cep" value={currentMembro.cep} onChange={this.estadoCep} />
                        </div>

                        <div className="form-group" >
                            <label htmlFor="membro_desde">Membro desde</label>
                            <input type="text" className="form-control" id="membro_desde"
                                value={currentMembro.membro_desde}
                                onChange={this.estadoMembro_Desde_Novo} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cargo">Cargo</label>
                            <select 
                                className="form-control" 
                                id="cargo"
                                value={currentMembro.cargo}
                                onChange={this.estadoSelectCargo}>
                                <option value="Membro">Membro</option>
                                <option value="Estrela">Estrela</option>  
                                <option value="Obreiro(a)">Obreiro(a)</option> 
                                <option value="Diácono/Diaconisa"> Diácono/Diaconisa </option>
                                <option value="Renascer"> Renascer </option>
                                <option value="Díscipulos Teus">Díscipulos Teus</option>
                                <option value="Ministro"> Ministro </option>
                                <option value="Presidente">Presidente</option>
                                <option value="Presidente de Honra">Presidente de Honra</option>
                                
                            </select>
                                
                                
                        </div>

                        <div className="form-group">
                            <label htmlFor="situacao">
                                <strong> Situação:  </strong>
                            </label>
                            {currentMembro.situacao ? " Ativo" : " Inativo"}
                        </div>
        
        
            </form>

            {currentMembro.situacao ? (
                <button className="badge badge-primary mr-2" onClick={() => this.atualizaSituacao(false)}>
                    Inativar
                </button>
            ) : (
                <button className="badge badge-primary mr-2" onClick={() => this.atualizaSituacao(true)}>
                    Ativar
                </button>
            )}



            <button className="badge badge-danger mr-2" onClick={this.apagaMembro}>
                    Apagar
            </button>

            <button type="submit" className="badge badge-success mr-2" onClick={this.salvarImagem} >
                    Alterar
            </button>
            
         <p>{this.state.message}</p>

        </div>

        

        ) : (
                <div>
                    <br />
                    <p>Selecione um membro...</p>
                </div>
            )}
        </div>
        )        
    }    
}    
