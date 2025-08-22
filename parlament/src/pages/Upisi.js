import { useEffect, useState } from "react";

export default function Upisi() {

  const [data,setData] =useState( [
    { ime: 'John', prezime: 'Doe',prisutan:false, razred:"III 2"},
    { ime: 'Jane', prezime: 'Smith',prisutan:false,razred:"III 2"},
    { ime: 'Alice', prezime: 'Johnson',prisutan:false,razred:"III 2"},
    { ime: 'Bob', prezime: 'Brown',prisutan:false ,razred:"III 2"}
]);

  useEffect( ()=>{
    const fecthUcenici = async ()=>{
      const response = await fetch('/dajUcenike',{
        method:"GET"
      });
      const json=await response.json();
      if (response.ok){
        console.log(json);
        for (const element of json){
           element.prisutan= false;
        }
        setData(json);
      }
    }
    fecthUcenici();
  },[])

  

  const [dodatni,setDodatni] = useState([]);
  const dodaj = ()=>{
    setDodatni([...dodatni, { ime: '', prezime: '',prisutan:false,razred:"" }]);
  }

  const ImeDodatni = (index,value)=>{
    if (index<dodatni.length){
      const updateData=[...dodatni];
      updateData[index].ime=value;
      setDodatni(updateData);
    }
  }
  const PrezimeDodatni =(index,value)=>{
    if (index<dodatni.length){
      const updateData=[...dodatni];
      updateData[index].prezime=value;
      setDodatni(updateData);
    }
  }
  const RazredDodatni = (index,value)=>{
    if (index<dodatni.length){
      const updateData=[...dodatni];
      updateData[index].razred=value;
      setDodatni(updateData);
    }
  }

  const PrisutanData= (index)=>{
    if (index<data.length){
      const updateData=[...data];
      updateData[index].prisutan=!updateData[index].prisutan;
      setData(updateData);
    }
    else{
      const i=index-data.length;
      const updateData=[...data];
      updateData[i].prisutan=!updateData[i].prisutan;
      setData(updateData);
    }
  }
  const PrisutanDodatni =(index)=>{
    if (index<dodatni.length){
      const updateData=[...dodatni];
      updateData[index].prisutan=!updateData[index].prisutan;
      setDodatni(updateData);
    }
    else{
      const i=index-dodatni.length;
      const updateData=[...dodatni];
      updateData[i].prisutan=!updateData[i].prisutan;
      setDodatni(updateData);
    }
  }

  const IzbrisiData = async(index)=>{
    const itemToDelete = data[index];
    console.log(itemToDelete.ime);
    setData(data.filter((_,i)=> i !==index));
    const izbrisi =  async ()=>{
      const response = await fetch("/izbrisi",{
        method:"DELETE",
        body:JSON.stringify({ime:itemToDelete.ime,prezime:itemToDelete.prezime}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(response.ok){
        console.log(response);
      }
    }
    izbrisi();
  
  }
  const izbrisiDodatne = (index)=>{
    const itemToDelete = dodatni[index];
    setDodatni(dodatni.filter((_, i) => i !== index));
    const izbrisi =  async ()=>{
      const response = await fetch("/izbrisi",{
        method:"DELETE",
        body:JSON.stringify({ime:itemToDelete.ime,prezime:itemToDelete.prezime}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(response.ok){
        console.log(response);
      }
    }
    izbrisi();
}
  const UpisDana=async()=>{
    console.log("upis dana");
    console.log(fDatum);
    console.log("Upisani ucenici", UpisanUcenik);
    const x = fDatum.toString();
    const response2  = await fetch("/upisDana",{
      method:"POST",
      body:JSON.stringify({dan:x,ucenici:UpisanUcenik,prisutan:PristuanUcenik}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const json = await response2.json();
    if (response2.ok){
      console.log("Dan upisan "+ json);
    }
  }
  const UpisanUcenik = []
  const PristuanUcenik = []
  const UpisiData = [...data, ...dodatni];
  const upisi= async ()=>{
    console.log(UpisiData);
    for (const element of UpisiData){

      const response = await fetch("/upisi",{
        method:"POST",
        body:JSON.stringify({ime:element.ime,prezime:element.prezime,prisutan:element.prisutan,razred:element.razred}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const json = await response.json()
      if (response.ok){
        console.log("poslato: ", json);
      }
      UpisanUcenik.push(element._id? element._id: json._id)
      PristuanUcenik.push(element.prisutan);
      console.log("upisani ucenici posle fettch",UpisanUcenik);
      console.log(PristuanUcenik);
    };
    UpisDana();
  }

  const datum = new Date();
  const fDatum = datum.toLocaleDateString('en-us',{
    year:"numeric",
    month:"long",
    day: "numeric"
  })
  return (
    <div className="upisi">
      <h1>Upisi ucenike</h1>
      <p>Danasnji datum: {fDatum}</p>
      <table>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Odeljenje</th>
                    <th>Prisutan</th>
                    <th>Izbrisi</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.ime}</td>
                        <td>{item.prezime}</td>
                        <td>{item.razred}</td>
                        <td><input type="checkbox" onChange={()=>{PrisutanData(index)}}/> </td>
                        <td><button type="checkbox" onClick={()=>{IzbrisiData(index)}}>Brisi</button></td>
                    </tr>
                ))}
                {dodatni.map((item,index)=>(
                    <tr key={index}>
                        <td><input type="text" onChange={(e)=>{ImeDodatni(index,e.target.value)}}/></td>
                        <td><input type="text" onChange={(e)=>{PrezimeDodatni(index,e.target.value)}}/></td>
                        <td><input type="text" onChange={(e)=>{RazredDodatni(index,e.target.value)}}/></td>
                        <td><input type="checkbox" onChange={()=>{PrisutanDodatni(index)}}/></td>
                        <td><button type="checkbox" onClick={()=>{izbrisiDodatne(index)}}>Brisi</button></td>
                    </tr>
                ))}
                <tr>
                  <td colSpan="5"><button onClick={dodaj} >Dodaj jos jednog</button></td>
                </tr>
            </tbody>
        </table>
        
        <button onClick={upisi}>Upisi</button>
    </div>
  )
}
