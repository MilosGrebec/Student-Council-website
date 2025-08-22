import React, { useEffect } from 'react'
import { useState } from 'react';
export default function Dnevnikl() {
    const [data,setData] =useState([
        [
        { ime: 'John', prezime: 'Doe',prisutan:false, razred:"III 2"},
        { ime: 'Jane', prezime: 'Smith',prisutan:false,razred:"III 2"},
        { ime: 'Alice', prezime: 'Johnson',prisutan:false,razred:"III 2"},
        { ime: 'Bob', prezime: 'Brown',prisutan:false ,razred:"III 2"}
        ],

        [   { ime: 'John', prezime: 'Doe',prisutan:false, razred:"III 2"},
            { ime: 'Jane', prezime: 'Smith',prisutan:false,razred:"III 2"},
            { ime: 'Alice', prezime: 'Johnson',prisutan:false,razred:"III 2"},
            { ime: 'Bob', prezime: 'Brown',prisutan:false ,razred:"III 2"}
        ]
    ]);
    const[dn,setDn]=useState([])
    useEffect(()=>{
        const fetchDan = async ()=>{
            const response = await fetch("/getDan",{
                method:"GET"
            });
            const json = await response.json();
            if (response.ok){
                setDn(json);
            }
        }
        fetchDan()
    },[])

    const [data2,setData2]= useState([]);
    let tabele = []
    useEffect(()=>{
        const fecthAllUcenici = async ()=>{
            if (dn.length>0){
                dn.forEach(element => {
                    tabele.push({dan:element.dan, ucenici:element.ucenici,prisutan:element.prisutan})    
                });
            }
            const UcenikPromise = tabele.map(async (element)=>{
                const uceniciData = await Promise.all(
                    element.ucenici.map(async (ucenikId)=>{
                        const response = await fetch(`/ucenikByID?id=${ucenikId}`,{
                            method:"GET"
                        });
                        return response.ok? await response.json():null;
                    })
                );
                return { dan: element.dan, ucenici: uceniciData,prisutan:element.prisutan };
            });
            const allData=await Promise.all(UcenikPromise);
            setData2(allData)
        }
        fecthAllUcenici();
    },[dn])
    console.log("Dn: ",dn);
    console.log("Data2:", data2);
    const [tabVid,setTabVid] = useState("block");
  return (
    <div className='dnevnik-Stranica'>
        {data2.length>0?data2.map((item,index)=>(
        <div key={index} style={{display:{tabVid}}}>
                <div className='datum'>
                    <p>{item.dan}</p>
                </div>
            
      <table>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Odeljenje</th>
                    <th>Prisutan</th>
                </tr>
            </thead>
            <tbody>
                {item.ucenici.length>0 && item.ucenici?item.ucenici.map((item2, index2) => (
                    <tr key={index2}>
                        <td>{item2?.ime || "N/A"}</td>
                        <td>{item2?.prezime || "N/A"}</td>
                        <td>{item2?.razred || "N/A"}</td>
                        <td>{item?.prisutan[index2] || "NIJE PRISUTAN"}</td>
                    </tr>
                )):<></>}
            </tbody>
        </table>
            </div>

        )):<></>}
    </div>
  )
}
