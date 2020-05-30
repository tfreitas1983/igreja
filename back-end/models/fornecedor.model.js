module.exports = mongoose => {
    var fornecedorSchema = mongoose.Schema ({
        razao: String,
        cnpj: { type: String, unique: true },
        categoria: String,
        situacao: Boolean        
    },
        { timestamps: true }
    )

    fornecedorSchema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject()
            object.id = _id
            return object
        })
    

    const Fornecedor = mongoose.model("fornecedores", fornecedorSchema)
    return Fornecedor
}     