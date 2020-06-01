const db = require("../models")
const Despesa = db.despesas

exports.cadastrar = (req, res) => {
    if (!req.body.descricao || !req.body.valor) {
        res.status(400).send({ message: "A descrição e/ou valor devem ser preenchidos"})
        return
    }

    const despesa = new Despesa ({
        descricao: req.body.descricao,
        valor: req.body.valor,
        vencimento: req.body.vencimento,
        dtpagamento: req.body.dtpagamento,
        dtliquidacao: req.body.dtliquidacao,
        fornecedor:req.body.fornecedor,
        categoria:req.body.categoria,
        formapagamento:req.body.formapagamento,
        parcelas:req.body.parcelas,
        status: req.body.status,
        situacao: req.body.situacao ? req.body.situacao: true        
    })

    despesa
        .save(despesa)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a despesa"
            })
        })
}

exports.buscarTodos = (req,res) => {
   // const {page = 1} = req.query;
    const descricao = req.query.descricao
    var condition = descricao ? { descricao: { $regex: new RegExp(descricao), $options: "i" } } : {}

    //Verifica se foi passada a descricao na busca
    if (descricao) {
        var query = Despesa.find(condition)
    } if (!descricao) {
        var query = {}
    }
    
   // Despesa.paginate(query,{page, limit: 100})
    Despesa.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar as despesas"
        })
    })
}

exports.buscarUm = (req, res) => {
    const id = req.params.id

    Despesa.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado a despesa com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a despesa com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Despesa.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar a despesa com o id=${id}. `
                })
            } else res.send({ message: "Despesa alterada com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar a despesa com o id " + id
            })
        })
}