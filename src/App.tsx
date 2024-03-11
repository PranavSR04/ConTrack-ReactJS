import React from 'react';
import './App.css';
import styles from './App.module.css'
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';
import ManageUsersHandler from './Features/ManageUsers/ManageUsersHandler';
import SideBar from './Components/SideBar/SideBar';


function App() {
  return (
    <div className={styles.body}>
    <NavBarHandler />
    <SideBar/>
    
    
 
    </div>
    
  );
}

export default App;
