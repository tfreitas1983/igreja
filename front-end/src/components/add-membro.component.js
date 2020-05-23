import React, { Component } from 'react'
import MembroDataService from "../services/membro.service"
import * as moment from 'moment'

export default class AdicionarMembro extends Component {
    constructor(props) {
        super(props)
        this.estadoNome = this.estadoNome.bind(this)
        this.estadoDtNascimento = this.estadoDtNascimento.bind(this)
        this.estadoSexo = this.estadoSexo.bind(this)
        this.estadoTelefone = this.estadoTelefone.bind(this)
        this.estadoRua = this.estadoRua.bind(this)
        this.estadoNum = this.estadoNum.bind(this)
        this.estadoComplemeto = this.estadoComplemeto.bind(this)
        this.estadoBairro = this.estadoBairro.bind(this)
        this.estadoCidade = this.estadoCidade.bind(this)
        this.estadoUf = this.estadoUf.bind(this)
        this.estadoCep = this.estadoCep.bind(this)
        this.estadoMembro_Desde = this.estadoMembro_Desde.bind(this)
        this.estadoCargo = this.estadoCargo.bind(this)
        this.estadoUpload = this.estadoUpload.bind(this)
       
        this.salvarImagem = this.salvarImagem.bind(this)
        this.salvarMembro = this.salvarMembro.bind(this)
        this.novoMembro = this.novoMembro.bind(this)

        this.state = {
            id: null,
            nome: "",
            dtnascimento: "",
            sexo: "",
            telefone: "",
            rua: "",
            num: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            membro_desde: "",
            cargo: "",
            situacao: true,
            foto: "default.jpg",
            imagem: "",
            url:"",
            submitted: false
        }
    }

    estadoUpload(e) {
        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "default.jpg", type: "image/jpeg"}
            const foto = "default.jpg"
            const url = ""
            this.setState({
                imagem: imagem,
                url: url,
                foto: foto
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

    estadoNome(e) {
        this.setState({
            nome: e.target.value
        })
    }

    estadoDtNascimento(e) {
        this.setState({
            dtnascimento: e.target.value
        })
    }

    estadoSexo(e) {
        this.setState({
            sexo: e.target.value
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

    estadoMembro_Desde(e) {
        this.setState({
            membro_desde: e.target.value
        })
    }

    estadoCargo(e) {
        this.setState({
            cargo: e.target.value
        })
    }

   salvarImagem() {
    
        if(this.state.foto === "default.jpg") {
            this.salvarMembro()  
            return false
        } if(this.state.foto !== "default.jpg") {
        
            var data = new FormData()
            data.append('file', this.state.imagem)
        
                MembroDataService.cadastrarImagem(data)
                            .then(response => {
                                this.setState({
                                    foto: response.data.foto
                                })
                                this.salvarMembro()
                            })
                            .catch(e => {
                                console.log(e)
                            })
        }
    }

    salvarMembro() {

        var data = {
            
            nome: this.state.nome,
            dtnascimento: moment(this.state.dtnascimento,'DD/MM/YYYY'),
            sexo: this.state.sexo,
            telefone: this.state.telefone,
            rua: this.state.rua,
            num: this.state.num,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf,
            cep: this.state.cep,
            membro_desde: moment(this.state.membro_desde,'DD/MM/YYYY'),
            cargo: this.state.cargo,
            foto: this.state.foto
        }

            MembroDataService.cadastrar(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        nome: response.data.nome,
                        dtnascimento: response.data.dtnascimento,
                        sexo: response.data.sexo,
                        telefone: response.data.telefone,
                        rua: response.data.rua,
                        num: response.data.num,
                        complemento: response.data.complemento,
                        bairro: response.data.bairro,
                        cidade: response.data.cidade,
                        uf: response.data.uf,
                        cep: response.data.cep,
                        membro_desde: response.data.membro_desde,
                        cargo: response.data.cargo,
                        foto: response.data.foto,
                        situacao: response.data.situacao,
                        submitted: true
                    })
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
    }

    novoMembro() {
        this.setState({
        id: null,
        nome: "",
        dtnascimento: "",
        sexo: "",
        telefone: "",
        rua: "",
        num: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
        membro_desde: "",
        cargo: "",
        situacao: true,
        foto: "",
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
            $imagePreview = <img alt="" src={images[this.state.foto]} />
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
                        <button className="btn btn-success" onClick={this.novoMembro}>
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

                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sexo"
                                    id="sexoFeminino"
                                    value="Feminino"
                                    checked={this.state.sexo === 'Feminino'}
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
                                    checked={this.state.sexo === 'Masculino'}
                                    onChange={this.estadoSexo} />
                            </div>
                            <label className="form-check-label">Masculino</label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefone"> Telefone </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="telefone" 
                            value={this.state.telefone} 
                            onChange={this.estadoTelefone} 
                            name="telefone" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="rua"> Rua </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="rua" 
                            value={this.state.rua} 
                            onChange={this.estadoRua} 
                            name="rua" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="num"> Número </label>
                            <input type="text" 
                            className="form-control" 
                            id="num" 
                            value={this.state.num} 
                            onChange={this.estadoNum} 
                            name="num" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="complemento"> Complemento </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="complemento" 
                            value={this.state.complemento} 
                            onChange={this.estadoComplemeto} 
                            name="complemento" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="bairro"> Bairro </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="bairro" 
                            value={this.state.bairro} 
                            onChange={this.estadoBairro} 
                            name="bairro" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="cidade"> Cidade </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="cidade" 
                            value={this.state.cidade} 
                            onChange={this.estadoCidade} 
                            name="cidade" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="uf"> UF </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="uf" 
                            value={this.state.uf} 
                            onChange={this.estadoUf} 
                            name="uf" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="cep"> CEP </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="cep" 
                            value={this.state.cep} 
                            onChange={this.estadoCep} 
                            name="cep" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="membro_desde"> Membro Desde </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="membro_desde" 
                            value={this.state.membro_desde} 
                            onChange={this.estadoMembro_Desde} 
                            name="membro_desde" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="cargo"> Cargo </label>
                            <select 
                                className="form-control" 
                                id="cargo" 
                                name="cargo"
                                value={this.state.cargo}                                    
                                onChange={this.estadoCargo}
                            >                                    
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
                    
                        <button onClick={this.salvarImagem} className="btn btn-success">
                            Adicionar
                        </button>
                    </div>
                )}
            </div>
        )
    }
}