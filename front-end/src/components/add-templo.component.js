import React, { Component } from 'react'
import TemploDataService from "../services/templo.service"

export default class AdicionarTemplo extends Component {
    constructor(props) {
        super(props)

        this.estadoRazao = this.estadoRazao.bind(this)
        this.estadoFantasia = this.estadoFantasia.bind(this)
        this.estadoCNPJ = this.estadoCNPJ.bind(this)
        this.estadoInscricao = this.estadoInscricao.bind(this)
        this.estadoEmail = this.estadoEmail.bind(this)
        this.estadoTelefone = this.estadoTelefone.bind(this)
        this.estadoRua = this.estadoRua.bind(this)
        this.estadoNum = this.estadoNum.bind(this)
        this.estadoComplemeto = this.estadoComplemeto.bind(this)
        this.estadoBairro = this.estadoBairro.bind(this)
        this.estadoCidade = this.estadoCidade.bind(this)
        this.estadoUf = this.estadoUf.bind(this)
        this.estadoCep = this.estadoCep.bind(this)

        this.salvarTemplo = this.salvarTemplo.bind(this)
        this.novoTemplo = this.novoTemplo.bind(this)
        this.estadoUpload = this.estadoUpload.bind(this)

        this.state = {
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
            situacao: true,
            logo: "default.jpg",
            imagem: "",
            url:"",
            submitted: false
        }

    }

    estadoUpload(e) {
        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "default.jpg", type: "image/jpeg"}
            const logo = "default.jpg"
            const url = ""
            this.setState({
                imagem: imagem,
                url: url,
                logo: logo
            })
        }
        //Quando o usuário escolhe uma imagem a ser enviada
        else {
            const imagem = e.target.files[0]
            this.setState({
                imagem: imagem,
                url: URL.createObjectURL(imagem)          
            })
        }
    }

    estadoRazao(e) {
        this.setState({
            razao: e.target.value
        })
    }

    estadoFantasia(e) {
        this.setState({
            fantasia: e.target.value
        })
    }

    estadoCNPJ(e) {
        this.setState({
            cnpj: e.target.value
        })
    }

    estadoInscricao(e) {
        this.setState({
            inscricao: e.target.value
        })
    }

    estadoEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    estadoTelefone(e) {
        this.setState({
            telefone: e.target.value
        })
    }

    estadoRua(e) {
        this.setState({
            rua: e.target.value
        })
    }

    estadoNum(e) {
        this.setState({
            num: e.target.value
        })
    }

    estadoComplemeto(e) {
        this.setState({
            complemento: e.target.value
        })
    }

    estadoBairro(e) {
        this.setState({
            bairro: e.target.value
        })
    }

    estadoCidade(e) {
        this.setState({
            cidade: e.target.value
        })
    }

    estadoUf(e) {
        this.setState({
            uf: e.target.value
        })
    }

    estadoCep(e) {
        this.setState({
            cep: e.target.value
        })
    }

    salvarTemplo() {

        var data = {
            
            razao: this.state.razao,
            fantasia: this.state.fantasia,
            cnpj: this.state.cnpj,
            inscricao: this.state.inscricao,
            email: this.state.email,
            telefone: this.state.telefone,
            rua: this.state.rua,
            num: this.state.num,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf,
            cep: this.state.cep,
            logo: this.state.logo
        }

            TemploDataService.cadastrar(data)
                .then(response => {
                    this.setState({
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
                        logo: response.data.logo,
                        situacao: response.data.situacao,
                        submitted: true
                    })
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
    }

    novoTemplo() {
        this.setState({
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
        situacao: true,
        logo: "default.jpg",
        submitted: false
        })
    }

    render() {


        //Monta um array com o nome dos arquivos
        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});
        //No array somente aceita as extensões de imagens
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url) {
            $imagePreview = <img alt="" src={this.state.url} />
        }
        if(!this.state.url) {
            $imagePreview = <img alt="" src={images[this.state.logo]} />
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
            <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4> Envio completado com sucesso!</h4>
                        <button className="btn btn-success" onClick={this.novoTemplo}>
                            Adicionar
                        </button>
                    </div>
                ) : (
                
                    <div>

                        <div className="form-group">

                            <div className="image-container">

                                <div className="envio">
                                    {$imagePreview}
                                </div>

                                <div className="envio">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="file"
                                        onChange={this.estadoUpload}
                                        id="file"
                                        name="file"
                                    /> 
                                </div>

                            </div>

                            <div>

                                <label htmlFor="nome"> Nome </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="nome" 
                                required 
                                value={this.state.nome} 
                                onChange={this.estadoNome} 
                                name="nome" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="dtnascimento"> Data de Nascimento </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="dtnascimento" 
                                    required 
                                    value={this.state.dtnascimento} 
                                    onChange={this.estadoDtNascimento} 
                                    name="dtnascimento" />
                            </div>
                        </div>
                        
                        <button onClick={this.salvarTemplo} className="btn btn-success">
                            Adicionar
                        </button>
                    </div>
                    )
            
                }
            </div>
        )
    }
}