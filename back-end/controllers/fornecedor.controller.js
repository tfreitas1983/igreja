const db = require("../models")
const Fornecedor = db.fornecedores

exports.cadastrar = (req, res) => {
    if (!req.body.razao) {
        res.status(400).send({ message: "A descrição deve ser preenchida"})
        return
    }

    const fornecedor = new Fornecedor ({
        razao: req.body.razao,
        cnpj: req.body.cnpj,
        categoria: req.body.categoria,
        situacao: req.body.situacao ? req.body.situacao: true        
    })

    fornecedor
        .save(fornecedor)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar o fornecedor"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const razao = req.query.razao
    var condition = razao ? { razao: { $regex: new RegExp(razao), $options: "i" } } : {}
       
    Fornecedor.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Um erro ocorreu ao buscar os fornecedores"
        })
    })
}

exports.buscarUm = (req, res) => {
    const id = req.params.id

    Fornecedor.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado o fornecedor com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o fornecedor com o id=" + id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Fornecedor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o fornecedor com o id=${id}. `
                })
            } else res.send({ message: "Fornecedor alterado com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o fornecedor com o id " + id
            })
        })
}

