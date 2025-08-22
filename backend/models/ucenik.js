const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uceninkSchema = new Schema({
    ime:{
        type: String,
        required: true
    },
    prezime:{
        type: String,
        required: true
    },
    prisutan:{
        type: Boolean,
        reqired: true
    },
    razred:{
        type:String,
        reqired:true
    }
},{timestamps:true});

module.exports = mongoose.model('ucenik',uceninkSchema);