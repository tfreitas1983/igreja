module.exports = app => {
    const membros = require('../controllers/membro.controller')
    const files = require('../controllers/file.controller')
    const templo = require('../controllers/templo.controller')
    import { Router } from 'express'
    import multer from 'multer'
    import multerConfig  from '../config/multer'
    
    var router =  new Router()
    const upload = multer(multerConfig)

    router.post("/membros", membros.cadastrar)
    router.get("/membros", membros.buscarTodos)
    router.get("/templo", templo.buscarTodos)
    router.get("/templo/:id", templo.buscar)
    router.put("/templo/:id", templo.editar)
    router.get("/membros/:id", membros.buscarUm)
    router.put("/membros/:id", membros.editar)
    router.delete("/membros/:id", membros.apagar)
    router.delete("/membros", membros.apagarTodos)
    router.post("/membros/files", upload.single('file'), membros.cadastrarImagem)
    router.get("/files/:id", membros.buscarImagem)
    router.post("/templo", templo.cadastrar)


    app.use('/api', router)

}