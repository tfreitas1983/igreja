import React, { Component } from "react"
import TemploDataService from "../services/templo.service"
import MembroDataService from "../services/membro.service"

export default class Templo extends Component {
    constructor(props){ 
        super(props)

        this.estadoRazao = this.estadoRazao.bind(this)
        this.estadoFantasia = this.estadoFantasia.bind(this)
        this.estadoCNPJ = this.estadoCNPJ.bind(this)
        this.estadoInscricao = this.estadoInscricao.bind(this)
        this.estadoEmail = this.estadoEmail.bind(this)
        this.estadoTelefone = this.estadoTelefone.bind(this)
        this.estadoRua = this.estadoRua.bind(this)
        this.estadoNum = this.estadoNum.bind(this)
        this.estadoComplemento = this.estadoComplemento.bind(this)
        this.estadoBairro = this.estadoBairro.bind(this)
        this.estadoCidade = this.estadoCidade.bind(this)
        this.estadoUf = this.estadoUf.bind(this)
        this.estadoCep = this.estadoCep.bind(this)
        this.estadoUpload = this.estadoUpload.bind(this)

        this.buscaTemplo = this.buscaTemplo.bind(this)
        this.salvarImagem = this.salvarImagem.bind(this)
        this.atualizaTemplo = this.atualizaTemplo.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)

        this.state = {
            currentTemplo: {
                id: null,
                razao: "",                
                fantasia: "",
                cnpj: "",
                inscricao: "",
                email: "",
                telefone: "",
                rua: "",
                num: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "",
                cep: "",
                foto: "",
                imagem: "",
                url: "",
                situacao: false
            },
                message: "",
        }
    }

    componentDidMount() {
        this.buscaTemplo(this.props.match.params.id)
    }

    estadoUpload(e) {
        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. 
        //Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "default.jpg", type: "image/jpeg"}
            const foto = "default.jpg"
            const url = ""
            this.setState(prevState => ({
                imagem: imagem,
                url: url,
                foto: foto,
                currentTemplo: {
                    ...prevState.currentTemplo,
                        foto: foto
                }
            }))
        //Quando o usuário escolhe uma imagem a ser enviada
        } else {
            const imagem = e.target.files[0]
            const foto =  e.target.files[0].name
            
            this.setState(prevState => ({
                imagem: imagem,
                url: URL.createObjectURL(imagem),
                currentTemplo: {
                    ...prevState.currentTemplo,
                        foto: foto
                }
            }))
        }
    }

    estadoRazao(e) {
        const razao = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                razao: razao
            }
        }))
    }

    estadoFantasia(e) {
        const fantasia = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                fantasia: fantasia
            }
        }))
    }

    estadoCNPJ(e) {
        const cnpj = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                cnpj: cnpj
            }
        }))
    }

    estadoInscricao(e) {
        const inscricao = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                inscricao: inscricao
            }
        }))
    }

    estadoEmail(e) {
        const email = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                email: email
            }
        }))
    }


    estadoTelefone(e) {
        const telefone = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                telefone: telefone
            }
        }))
    }

    estadoRua(e) {
        const rua = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                rua: rua
            }
        }))
    }

    estadoNum(e) {
        const num = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                num: num
            }
        }))
    }

    estadoComplemento(e) {
        const complemento = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                complemento: complemento
            }
        }))
    }

    estadoBairro(e) {
        const bairro = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                bairro: bairro
            }
        }))
    }
    
    estadoCidade(e) {
        const cidade = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                cidade: cidade
            }
        }))
    }

    estadoUf(e) {
        const uf = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                uf: uf
            }
        }))
    }

    estadoCep(e) {
        const cep = e.target.value
        this.setState(prevState => ({
            currentTemplo: {
                ...prevState.currentTemplo,
                cep: cep
            }
        }))
    }

    buscaTemplo(id) {
        TemploDataService.buscar(id)
            .then(response => {
                this.setState({
                    currentTemplo: {
                        id: response.data.id,
                        razao: response.data.razao,
                        fantasia: response.data.fantasia,
                        cnpj: response.data.cnpj,
                        inscricao: response.data.inscricao,
                        email: response.data.email,
                        telefone: response.data.telefone,
                        rua: response.data.rua,
                        num: response.data.num,
                        complemento: response.data.complemento,
                        bairro: response.data.bairro,
                        cidade: response.data.cidade,
                        uf: response.data.uf,
                        cep: response.data.cep,
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
        if(this.state.foto === "default.jpg" || !this.state.url) {
            this.atualizaTemplo()  
            return false
        } if(this.state.foto !== "default.jpg") {
        var data = new FormData()
        data.append('file', this.state.imagem)
               
            MembroDataService.cadastrarImagem(data)
                        .then(response => {
                            this.setState(prevState => ({
                                currentTemplo: {
                                    ...prevState.currentTemplo,
                                    foto: response.data.foto
                                }
                            }))
                            this.atualizaTemplo()
                        })
                        .catch(e => {
                            console.log(e)
                        })
       }
    }

    atualizaSituacao(status) {
        var data = {
            id: this.state.currentTemplo.id,
            razao: this.state.currentTemplo.razao,
            fantasia:this.state.currentTemplo.fantasia,
            cnpj: this.state.currentTemplo.cnpj,
            inscricao: this.state.currentTemplo.inscricao,
            email: this.state.currentTemplo.email,
            telefone: this.state.currentTemplo.telefone,
            rua: this.state.currentTemplo.rua,
            num: this.state.currentTemplo.num,
            complemento: this.state.currentTemplo.complemento,
            bairro: this.state.currentTemplo.bairro,
            cidade: this.state.currentTemplo.cidade,
            uf: this.state.currentTemplo.uf,
            cep: this.state.currentTemplo.cep,
            foto: this.state.currentTemplo.foto,
            situacao: status
        }

        TemploDataService.editar(this.state.currentTemplo.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentTemplo: {
                        ...prevState.currentTemplo,
                        situacao: status
                    }
                }))

            })
            .catch(e => {
                console.log(e)
            })
    }

    atualizaTemplo() {
        
        var data = {
            id: this.state.currentTemplo.id,
            razao: this.state.currentTemplo.razao,
            fantasia:this.state.currentTemplo.fantasia,
            cnpj: this.state.currentTemplo.cnpj,
            inscricao: this.state.currentTemplo.inscricao,
            email: this.state.currentTemplo.email,
            telefone: this.state.currentTemplo.telefone,
            rua: this.state.currentTemplo.rua,
            num: this.state.currentTemplo.num,
            complemento: this.state.currentTemplo.complemento,
            bairro: this.state.currentTemplo.bairro,
            cidade: this.state.currentTemplo.cidade,
            uf: this.state.currentTemplo.uf,
            cep: this.state.currentTemplo.cep,
            foto: this.state.currentTemplo.foto
        }

        TemploDataService.editar( this.state.currentTemplo.id, data )
            .then(response => {
                this.setState({
                    message: "O templo foi alterado com sucesso"
                })

            })
            .catch(e => {
                console.log(e)
            })
    }    

  

    render() {
        const { currentTemplo } = this.state


        //Monta um array com os nomes dos arquivos
        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});

        // Constante que pega todas as imagens da pasta images
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        
        
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url && currentTemplo.foto !== "default.jpg") {
            $imagePreview = <img alt="" src={this.state.url} />
        } if((currentTemplo.foto.length > 30 || currentTemplo.foto === "default.jpg") && !this.state.url) {
            $imagePreview = <img alt="" src={images[currentTemplo.foto]} />
        }

        //Verifica se a imagem possui mais de 2 MB
        if(this.state.imagem && (this.state.imagem.size > 2 * 1024 * 1024)){
            alert('Somente arquivos até 2MB')
        }
        //Verifica se é uma imagem
        if(this.state.imagem && this.state.imagem.type.substr(0,6) !== "image/" && this.state.imagem.type !== "") {
            alert('Somente imagens podem ser enviadas')
        } 
      
        
        return (
        <div>
            { currentTemplo ? (
                <div className="edit-form">
                    <h4>Templo</h4>
                    <form>
                        <div className="image-container">

                            <div className="imagem">
                                {$imagePreview}
                            </div>
                            
                            <div className="envio">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="upload-btn"
                                    onChange={this.estadoUpload} 
                                /> 
                            </div>

                        </div>

                        <div className="form-group">
                            <label htmlFor="razao">Razão Social</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="razao" 
                                value={currentTemplo.razao} 
                                onChange={this.estadoRazao} />
                        </div>    

                        <div className="form-group">
                            <label htmlFor="fantasia">Nome Fantasia</label>
                            <input
                            className="form-control"
                            id="fantasia"
                            value={currentTemplo.fantasia}
                            onChange={this.estadoFantasia} />                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input
                            type="number"
                            className="form-control"
                            id="cnpj"
                            value={currentTemplo.cnpj}
                            onChange={this.estadoCNPJ} />                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="inscricao">Inscrição Municipal</label>
                            <input
                            className="form-control"
                            id="inscricao"
                            value={currentTemplo.inscricao}
                            onChange={this.estadoInscricao} />
                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={currentTemplo.email}
                            onChange={this.estadoEmail} />                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefone">Telefone</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="telefone" 
                                value={currentTemplo.telefone} 
                                onChange={this.estadoTelefone} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rua">Rua</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="rua" 
                                value={currentTemplo.rua} 
                                onChange={this.estadoRua} />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="num">Número</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="num" 
                                value={currentTemplo.num} 
                                onChange={this.estadoNum} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="complemento">Complemento</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="complemento" 
                                value={currentTemplo.complemento} 
                                onChange={this.estadoComplemento} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bairro">Bairro</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="bairro" 
                                value={currentTemplo.bairro} 
                                onChange={this.estadoBairro} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="cidade" 
                                value={currentTemplo.cidade} 
                                onChange={this.estadoCidade} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="uf">UF</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="uf" 
                                value={currentTemplo.uf} 
                                onChange={this.estadoUf} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cep">CEP</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="cep" 
                                value={currentTemplo.cep} 
                                onChange={this.estadoCep} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="situacao">
                                <strong> Situação:  </strong>
                            </label>
                            {currentTemplo.situacao ? " Ativo" : " Inativo"}
                        </div>
        
        
            </form>

            {currentTemplo.situacao ? (
                <button className="badge badge-primary mr-2" onClick={() => this.atualizaSituacao(false)}>
                    Inativar
                </button>
            ) : (
                <button className="badge badge-primary mr-2" onClick={() => this.atualizaSituacao(true)}>
                    Ativar
                </button>
            )}

            <button type="submit" className="badge badge-success mr-2" onClick={this.salvarImagem}>
                    Alterar
            </button>
            
         <p>{this.state.message}</p>

        </div>

        

        ) : (
                <div>
                    <br />
                    <p>Selecione o templo...</p>
                </div>
            )}
        </div>
        )        
    }    








}

