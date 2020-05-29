const dbConfig = require ('../config/db.config')
const mongoose = require ('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.membros = require ('./membros.model')(mongoose)
db.files = require ('./files.model')(mongoose)
db.templo = require ('./templo.model')(mongoose)
db.despesas = require ('./despesas.model')(mongoose)
db.receitas = require ('./receitas.model')(mongoose)
db.categorias = require ('./categoria.model')(mongoose)
db.fornecedores = require ('./fornecedor.model')(mongoose)

module.exports = db

