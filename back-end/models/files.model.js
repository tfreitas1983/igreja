module.exports = mongoose => {
    var schemaFiles = mongoose.Schema ({
        original: String,
        foto: String,              
        size: Number        
    },
        { timestamps: true }
    )

    schemaFiles.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })
    

    const Files = mongoose.model("files", schemaFiles)
    return Files
}