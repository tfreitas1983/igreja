const db = require("../models")
const Files = db.files

exports.cadastrar = (req, res) => {
    const { originalname: original, filename: foto } = req.file
    if (!nome) {
        res.status(400).send({ message: "A imagem deve ser enviada"})
        return
    }

    const file = new Files ({
        original,
        foto,
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
    const filename = req.body.nome
   
    Files.find(filename)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrada a imagem com o nome "+ filename })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a imagem com o nome=" +filename })
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