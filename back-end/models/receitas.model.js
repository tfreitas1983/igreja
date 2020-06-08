module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    const AutoIncrement = require('mongoose-sequence')(mongoose)
    var receitasSchema = mongoose.Schema ({
        numrec: Number,
        descricao: String,
        valor: Number,
        dtpagamento: Date,
        dtliquidacao: Date,
        membro: String,
        categoria: String,
        status: String,
        formapagamento: String,
        parcelas: String,
        arquivos: { type: [String], index: true } ,
        situacao: Boolean        
    },
        { timestamps: true }
    )

    receitasSchema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject()
            object.id = _id
            return object
        })
    
    receitasSchema.plugin(mongoosePaginate)
    receitasSchema.plugin(AutoIncrement, {numrec:'num_seq', inc_field: 'numrec'})
    const Receitas = mongoose.model("receitas", receitasSchema)
    return Receitas
}     