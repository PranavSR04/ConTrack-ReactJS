import React from 'react';

import './App.css';
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';

import AddMsa from './Features/MSA/AddMsa/AddMsa';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <NavBarHandler />
    {/* <RevenueProjectionHandler /> */}
    
    </>
    
  );
}

export default App;
