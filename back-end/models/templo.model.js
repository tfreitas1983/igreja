module.exports = mongoose => {
    var temploSchema = mongoose.Schema ({
        razao: String,
        fantasia: String,
        cnpj: Number,
        inscricao: Number,
        telefone: String,
        email: String,
        rua: String,
        num: String,
        complemento: String,
        bairro: String,
        cidade: String,
        uf: String,
        cep: String,
        situacao: Boolean,
        foto: {
            type: String,
            default: 'logo.jpg'
        }
    },
        { timestamps: true }
    )

    temploSchema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject()
            object.id = _id
            return object
        })
    

    const Templo = mongoose.model("templo", temploSchema)
    return Templo
}        