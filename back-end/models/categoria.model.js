module.exports = mongoose => {
    var categoriaSchema = mongoose.Schema ({
        descricao: String,
        tipo: String,
        situacao: Boolean        
    },
        { timestamps: true }
    )

    categoriaSchema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject()
            object.id = _id
            return object
        })
    

    const Categoria = mongoose.model("categoria", categoriaSchema)
    return Categoria
}