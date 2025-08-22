import { useEffect, useState } from "react"

export default function Home() {

  const [dogadjaji,setDogadjaji] = useState([]);

  useEffect(()=>{
    const fetchDan = async ()=>{
      const response = await fetch("/getDogadjaj",{
          method:"GET"
      });
      const json = await response.json();
      if (response.ok){
          console.log(json);
          setDogadjaji(json);
      }
  }
  fetchDan()
  },[])

  console.log(dogadjaji);
  return (
    <div className="home">
      <h1>Učenicki Parlament</h1>
          {dogadjaji.length>0? dogadjaji.map((item,index)=>(
            <table className="tabelaD" key={index}>
            <tbody >
            <tr>
              <td className="tdD">{item.ime}</td>
            </tr>
            <tr>
              <td className="tdD">{item.opis}</td>
            </tr>
            </tbody>
            </table>
          )):<></>}
    </div>
  )
}
