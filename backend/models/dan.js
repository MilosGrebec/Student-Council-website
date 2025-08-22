const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const danSchema = Schema({
    dan:{
        type:String,
        required:true
    },
    ucenici:[{
        type: Schema.Types.ObjectId,
        ref:"ucenik"
    }],
    prisutan:[{
        type: Boolean
    }]
},{timestamps:true})

module.exports=mongoose.model('dan',danSchema)