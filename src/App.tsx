import React from 'react';

import './App.css';
import styles from './App.module.css'
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';
import SideBar from './Components/SideBar/SideBar';

import AddMsa from './Features/MSA/AddMsa/AddMsa';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddMsaHandler from './Features/MSA/AddMsa/AddMsaHandler';

function App() {
  return (
    <div className={styles.body}>
    <NavBarHandler />
    <SideBar/>
    <AddMsaHandler/>
    
 
    </div>
    
  );
}

export default App;
