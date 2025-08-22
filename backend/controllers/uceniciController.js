const Ucenici = require("../models/ucenik");
const mongoose = require('mongoose');

const deleteUcenik = async(req,res)=>{
    const {ime,prezime} =req.body;
    try{
        const ucenik = await Ucenici.findOneAndDelete({ime:ime,prezime:prezime})
        res.status(200).json("deleted");
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const UcenikById = async(req,res)=>{
    const id=req.query.id;
    try{
        const ucenik = await Ucenici.findById({_id:id})
        res.status(200).json(ucenik);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const UcenikPrisutan = async(req,res)=>{
    const{ime,prezime,prisutan}=req.body;
    try{
        const ucenik = await Ucenici.findOneAndUpdate({ime:ime,prezime:prezime},{prisutan:prisutan});
        res.status(200).json(ucenik);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const UceniciId = async(req,res)=>{
    const{ime,prezime}= req.body;
    try{
        const ucenik = await Ucenici.findOne({ime:ime,prezime:prezime})
        res.status(200).json(ucenik._id);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const getUcenici = async (req,res)=>{
    const ucenici=  await Ucenici.find()
    res.status(200).json(ucenici);
}
const postUcenici = async (req,res)=>{
    console.log(req.body);
    const {ime,prezime,prisutan,razred} = req.body;
    try{
        const postji = await Ucenici.findOne({ime:ime, prezime:prezime})
        if (postji){
            console.log(ime,prezime);
            console.log("postoji");
            const po = await Ucenici.findOneAndUpdate({ime:ime,prezime:prezime},{prisutan:prisutan})
            return res.status(400).json({ error: "Ucenik already exists" });
        }
        const ucenik = await Ucenici.create({ime,prezime,prisutan,razred});
        res.status(200).json(ucenik);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

module.exports={
    getUcenici,
    postUcenici,
    deleteUcenik,
    UceniciId,
    UcenikById,
    UcenikPrisutan
}