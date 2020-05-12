const db = require("../models")
const Files = db.files

exports.cadastrar = (req, res) => {
    if (!req.file.nome) {
        res.status(400).send({ message: "A imagem deve ser enviada"})
        return
    }

    const file = new File ({
        nome: req.file.nome,
        path: req.file.path,
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

exports.buscar = (req, res) => {
    const id = req.params.id

    Files.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrada a imagem com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a imagem com o id=" +id })
        })
}
/*
class fileController {
    async store (req, res) {
        const { originalname: nome, filename: path } = req.file

        const file = await Files.create({
            nome,
            path,
        })

        return res.json(file)
    }
}

*/


//export default new fileController()