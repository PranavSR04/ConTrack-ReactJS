import React from 'react';
import './App.css';
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';
import SideBar from './Components/SideBar/SideBar';


function App() {
  return (
    <>
    <NavBarHandler />
    <SideBar>
    <RevenueProjectionHandler />
    </SideBar>
    
    

    
    </>
    
  );
}

export default App;
