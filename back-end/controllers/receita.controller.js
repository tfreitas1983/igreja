const db = require("../models")
const Receita = db.receitas

exports.cadastrar = (req, res) => {
    if (!req.body.descricao || !req.body.valor) {
        res.status(400).send({ message: "A descrição e/ou valor devem ser preenchidos"})
        return
    }

    const receita = new Receita ({
        descricao: req.body.descricao,
        valor: req.body.valor,
        dtpagamento: req.body.dtpagamento,
        dtliquidacao: req.body.dtliquidacao,
        membro:req.body.membro,
        categoria:req.body.categoria,
        status: req.body.status,
        formapagamento:req.body.formapagamento,
        parcelas:req.body.parcelas,
        situacao: req.body.situacao ? req.body.situacao: true        
    })

    receita
        .save(receita)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a receita"
            })
        })
}

exports.buscarTodos = (req,res) => {
   
    const descricao = req.query.descricao
    var condition = descricao ? { descricao: { $regex: new RegExp(descricao), $options: "i" } } : {}

    //Verifica se foi passada a descricao na busca
    if (descricao) {
        var query = Receita.find(condition)
    } if (!descricao) {
        var query = {}
    }
    
    Receita.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar as receitas"
        })
    })
}

exports.buscarUm = (req, res) => {
    const id = req.params.id

    Receita.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado a receita com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a receita com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Receita.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar a receita com o id=${id}. `
                })
            } else res.send({ message: "Receita alterada com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar a receita com o id " + id
            })
        })
}