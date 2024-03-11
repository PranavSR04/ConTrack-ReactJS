import React from 'react';
import './App.css';
import styles from './App.module.css'
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';


function App() {
  return (
    <div className={styles.body}>
    <NavBarHandler />
    <RevenueProjectionHandler />
 
    </div>
    
  );
}

export default App;
