const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/UceniciRute');
const {getUcenici, postUcenici,deleteUcenik, UceniciId, UcenikById, UcenikPrisutan} = require("./controllers/uceniciController");
const { postDan, getDan } = require('./controllers/danController');
const { DogadjajPost, getDogadjaj } = require('./controllers/dogController');

const app= express();

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})
app.get('/dajUcenike',getUcenici);
app.post('/upisi',postUcenici);
app.delete('/izbrisi',deleteUcenik);
app.post('/upisDana',postDan);
app.get("/ucenikID",UceniciId);
app.get("/ucenikByID",UcenikById);
app.get("/ucenikPrisutan",UcenikPrisutan)
app.get("/getDan",getDan);
app.post("/postDog",DogadjajPost);
app.get("/getDogadjaj",getDogadjaj);

mongoose.connect("mongodb+srv://bercogged:parlament123@cluster0.sasf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        app.listen(4000,()=>{
            console.log("listening on port 4000")
        })
    })
    .catch((err)=>{
        console.log(err);
    })