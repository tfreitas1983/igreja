module.exports = mongoose => {
    var categoriaSchema = mongoose.Schema ({
        categoria: { type: String, unique: true },
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