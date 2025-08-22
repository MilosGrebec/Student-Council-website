const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogSchema = new Schema({
    ime:{
        type:String,
        required:true
    },
    opis:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('dogadjaj',DogSchema);