import { useNavigate } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();
    const upis= ()=>{
        navigate("/upisi");
    }
    const dog =()=>{
        navigate("/dogadjaj");
    }
    const dnevnik = ()=>{
        navigate("dnevnik");
    }
    const pocetna = ()=>{
        navigate("/");
    }
    return ( 
        <div className="nav"> 
            <button className="upis" onClick={pocetna}>Pocetna</button>
            <button className="dogadjaj" onClick={dog}>Dodaj dogadjaj</button>
            <button className="dnevnik" onClick={dnevnik}>Dnevnik</button>
            <button className="pocetna" onClick={upis}>Upisivanje</button>
        </div>
     );
}

export default Nav;