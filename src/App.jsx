import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Welcome from './pages/welcome';
import Data from './pages/data';
import Samplesignup from './pages/SampleSIgnup';
import Login from './pages/login';


function App() {


  return (
    <Routes>
      <Route path="/" element={<Welcome/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="*" element={<NoPage />} />
      <Route path="/data" element={<Data />} />
      <Route path="/Samplesignup" element={<Samplesignup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  
  );
}

export default App;
