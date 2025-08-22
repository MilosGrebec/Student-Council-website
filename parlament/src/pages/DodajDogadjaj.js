import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function DodajDogadjaj() {
    const navigate=useNavigate();
    const [ime,setIme]=useState();
    const [opis,setOpis] = useState();
    const dodaj = async()=>{
        console.log(ime);
        console.log(opis);
        const fetchDog = await fetch('/postDog',{
            method:"POST",
            body:JSON.stringify({ime:ime,opis:opis}),
            headers:{
              'Content-Type':'application/json'
            }
        })
        const json = fetchDog.json();
        if (fetchDog.ok){
            console.log("Dogadjaj upisan:"+json);
            navigate('/')
        }
    }
 
  return (
<div className="dogadjajStranica">
    <div className="formContainer">
        <label className="Naziv">Naziv:</label>
        <input type="text" className="ime" onChange={(e)=>{setIme(e.target.value)}}  /><br />
        
        <label className="Opis">Opis:</label>
        <textarea className="opis" onChange={(e)=>{setOpis(e.target.value)}}></textarea><br />
        
        <button className="dugmeD" onClick={dodaj}>Dodaj</button>
    </div>
</div>

  )
}