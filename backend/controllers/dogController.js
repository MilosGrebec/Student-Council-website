const Dogadjaj= require('../models/dogadjaj');

const getDogadjaj = async(req,res)=>{
    try{
        const dogadjaj=await Dogadjaj.find()
        res.status(200).json(dogadjaj);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const DogadjajPost = async(req,res)=>{
    const {ime,opis} = req.body;
    try{
        const dogadjaj= await Dogadjaj.create({ime:ime,opis:opis})
        res.status(200).json(dogadjaj);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}
module.exports={
    DogadjajPost,
    getDogadjaj
}