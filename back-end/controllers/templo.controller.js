const db = require("../models")
const Templo = db.templo
const Files = db.files

exports.cadastrar = (req, res,) => {
    if (!req.body.razao) {
        res.status(400).send({ message: "A razão social deve ser preenchida"})
        return
    }

    const templo = new Templo ({
        razao: req.body.razao,
        fantasia: req.body.fantasia,
        cnpj: req.body.cnpj,
        inscricao: req.body.inscricao,
        telefone: req.body.telefone,
        email: req.body.email,
        rua: req.body.rua,
        num: req.body.num,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        cep: req.body.cep,
        situacao: req.body.situacao ? req.body.situacao: true,
        foto: req.body.foto
    })

    templo
        .save(templo)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar o templo"
            })
        })

}

exports.buscar = (req, res) => {
    const id = req.params.id

    Templo.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado nenhum templo ativo" })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o templo ativo" })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Templo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o templo com o id=${id}. `
                })
            } else res.send({ message: "Templo alterado com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o templo com o id " + id
            })
        })
}

exports.buscarTodos = (req, res) => {
    const razao = req.query.razao
    var condition = razao ? { razao: { $regex: new RegExp(nome), $options: "i" } } : {}

    Templo.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar o templo"
        })
    })
}