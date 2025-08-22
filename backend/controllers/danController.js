const Dan = require('../models/dan');

const postDan=async(req,res)=>{
    const {dan,ucenici,prisutan} = req.body;
    try {
        const dann = await Dan.create({dan:dan, ucenici:ucenici,prisutan:prisutan})
        res.status(200).json(dann);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}
const getDan= async(req,res)=>{
    try{
        const dan = await Dan.find()
        res.status(200).json(dan);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
module.exports={
    postDan,
    getDan
}