module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    const AutoIncrement = require('mongoose-sequence')(mongoose)
    var despesasSchema = mongoose.Schema ({
        numdesp: Number,
        descricao: String,
        valor: Number,
        vencimento: Date,
        dtpagamento: Date,
        dtliquidacao: Date,
        fornecedor: String,
        categoria: String,
        formapagamento: String,
        parcelas: String,
        situacao: Boolean        
    },
        { timestamps: true }
    )

    despesasSchema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject()
            object.id = _id
            return object
        })
    
    despesasSchema.plugin(mongoosePaginate)
    despesasSchema.plugin(AutoIncrement, {num:'numdesp_seq', inc_field: 'numdesp'})
    const Despesas = mongoose.model("despesas", despesasSchema)
    return Despesas
}        