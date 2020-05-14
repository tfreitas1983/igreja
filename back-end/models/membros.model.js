module.exports = mongoose => {
    var schema = mongoose.Schema ({
        nome: String,
        dtnascimento: { type: Date }, 
        sexo: String,
        telefone: String,
        rua: String,
        num: String,
        complemento: String,
        bairro: String,
        cidade: String,
        uf: String,
        cep: String,
        membro_desde: { type: Date },
        cargo: String,
        situacao: Boolean,
        foto: {
            type: String,
            default: 'default.jpg'
        }
    },
        { timestamps: true }
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })
    

    const Membros = mongoose.model("membros", schema)
    return Membros
}