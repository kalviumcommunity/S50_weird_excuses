import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/Landingpage';
import Firstpage from './Components/Firstpage';


function App() {
  return (
    <div>
    <Routes>
    <Route path="/" element={<LandingPage />} />
        <Route path="/firstpage" element={<Firstpage />} />
    </Routes>
    </div>
  );
}

export default App;
