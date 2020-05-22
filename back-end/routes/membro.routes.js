module.exports = app => {
    const membros = require('../controllers/membro.controller')
    const files = require('../controllers/file.controller')
    import { Router } from 'express'
    import multer from 'multer'
    import multerConfig  from '../config/multer'
    
    var router =  new Router()
    const upload = multer(multerConfig)

    router.post("/", membros.cadastrar)
    router.get("/", membros.buscarTodos)
    router.get("/:id", membros.buscarUm)
    router.put("/:id", membros.editar)
    router.delete("/:id", membros.apagar)
    router.delete("/", membros.apagarTodos)
    router.post("/files", upload.single('file'), membros.cadastrarImagem)

    app.use('/api/membros', router)

}