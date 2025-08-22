import { Routes, Route, Router } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Nav from './components/Nav';
import Upisi from './pages/Upisi';
import Dnevnikl from './pages/Dnevnikl';
import DodajDogadjaj from './pages/DodajDogadjaj';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/upisi' element={<Upisi/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/dnevnik' element={<Dnevnikl/>}/>
        <Route path='/dogadjaj' element={<DodajDogadjaj/>}/>
      </Routes>
    </div>

  );
}

export default App;
