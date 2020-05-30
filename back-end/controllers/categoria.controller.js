const db = require("../models")
const Categoria = db.categorias

exports.cadastrar = (req, res) => {
    if (!req.body.categoria || !req.body.tipo) {
        res.status(400).send({ message: "A categoria e/ou tipo devem ser preenchidos"})
        return
    }
    
    const cat = new Categoria ({
        categoria: req.body.categoria,
        tipo: req.body.tipo,
        situacao: req.body.situacao ? req.body.situacao: true        
    })
    
    cat
        .save(cat)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a categoria"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const cat = req.query.categoria
    var condition = cat ? { cat: { $regex: new RegExp(cat), $options: "i" } } : {}
       
    Categoria.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Um erro ocorreu ao buscar as categorias"
        })
    })
}

exports.buscarUm = (req, res) => {
    const id = req.params.id

    Categoria.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado a categoria com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a categoria com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Categoria.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar a categoria com o id=${id}. `
                })
            } else res.send({ message: "Categoria alterada com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar a categoria com o id " + id
            })
        })
}
