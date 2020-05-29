module.exports = app => {
    const membros = require('../controllers/membro.controller')
    const templo = require('../controllers/templo.controller')
    const despesas = require ('../controllers/despesa.controller')
    const receitas = require ('../controllers/receita.controller')
    const categorias = require ('../controllers/categoria.controller')
    const fornecedores = require ('../controllers/fornecedor.controller')
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
    router.post("/financeiro/despesas", despesas.cadastrar)
    router.get("/financeiro/despesas", despesas.buscarTodos)
    router.get("/financeiro/despesas/:id", despesas.buscarUm)
    router.put("/financeiro/despesas/:id", despesas.editar)
    router.post("/financeiro/receitas", receitas.cadastrar)
    router.get("/financeiro/receitas", receitas.buscarTodos)
    router.get("/financeiro/receitas/:id", receitas.buscarUm)
    router.put("/financeiro/receitas/:id", receitas.editar)
    router.post("/financeiro/categorias", categorias.cadastrar)
    router.get("/financeiro/categorias", categorias.buscarTodos)
    router.get("/financeiro/categorias/:id", categorias.buscarUm)
    router.put("/financeiro/categorias/:id", categorias.editar)
    router.post("/financeiro/fornecedores", fornecedores.cadastrar)
    router.get("/financeiro/fornecedores", fornecedores.buscarTodos)
    router.get("/financeiro/fornecedores/:id", fornecedores.buscarUm)
    router.put("/financeiro/fornecedores/:id", fornecedores.editar)

    app.use('/api', router)

}