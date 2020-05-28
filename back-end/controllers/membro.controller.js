const db = require("../models")
const Membro = db.membros
const Files = db.files


exports.cadastrar = (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({ message: "O nome deve ser preenchido"})
        return
    }

    const membro = new Membro ({
        nome: req.body.nome,
        dtnascimento: req.body.dtnascimento,
        sexo: req.body.sexo,
        telefone: req.body.telefone,
        rua: req.body.rua,
        num:req.body.num,
        complemento:req.body.complemento,
        bairro:req.body.bairro,
        cidade:req.body.cidade,
        uf:req.body.uf,
        cep:req.body.cep,
        membro_desde: req.body.membro_desde,
        cargo:req.body.cargo,
        situacao: req.body.situacao ? req.body.situacao: true,
        foto: req.body.foto
    })

    membro
        .save(membro)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar o membro"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query;
    const nome = req.query.nome
    var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {}


    //Verifica se foi passado o nome na busca
    if (nome) {
        var query = Membro.find(condition)
    } if (!nome) {
        var query = {}
    }
    
    Membro.paginate(query,{page, limit: 5})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar os membros"
        })
    })
}

exports.buscarUm = (req, res) => {
    const id = req.params.id

    Membro.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado o membro com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o membro com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Membro.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o membro com o id=${id}. `
                })
            } else res.send({ message: "Membro alterado com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o membro com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    Membro.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletar o membro com o id " + id
                })
            } else {
                res.send({
                    message: "Membro deletado com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar o membro com o id " + id
            })
        })
}

exports.apagarTodos = (req, res) => {
    Membro.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} membros foram deletados com sucesso`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todos os membros"
            })
        })
}

exports.buscarAtivos = (req, res) => {
    Membro.find({ situacao: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar os membros ativos"
            })
        })
}

exports.buscarImagem = (req, res) => {
    const filename = req.params.foto
    Membro.find(filename)
  
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar os membros com foto"
            })
        })
}


exports.cadastrarImagem = (req, res) => {
    const { originalname: original, filename: foto } = req.file
    if (!foto) {
        res.status(400).send({ message: "A imagem deve ser enviada"})
        return
    }

    const file = new Files ({
       original,
       foto
    })
    file    
        .save(file)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a imagem"
            })
        })
}





