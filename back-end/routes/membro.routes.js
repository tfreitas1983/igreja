module.exports = app => {
    const membros = require('../controllers/membro.controller')
    const files = require('../controllers/file.controller')
    const templo = require('../controllers/templo.controller')
    import { Router } from 'express'
    import multer from 'multer'
    import multerConfig  from '../config/multer'
    
    var router =  new Router()
    const upload = multer(multerConfig)

    router.post("/", membros.cadastrar)
    router.get("/", membros.buscarTodos)
    router.get("/templo", templo.buscarTodos)
    router.get("/templo/:id", templo.buscar)
    router.put("/templo/:id", templo.editar)
    router.get("/:id", membros.buscarUm)
    router.put("/:id", membros.editar)
    router.delete("/:id", membros.apagar)
    router.delete("/", membros.apagarTodos)
    router.post("/files", upload.single('file'), membros.cadastrarImagem)
    router.post("/templo", templo.cadastrar)


    app.use('/api/membros', router)

}