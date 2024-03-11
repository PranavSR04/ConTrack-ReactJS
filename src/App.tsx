import React from 'react';
import './App.css';
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';
import SideBar from './Components/SideBar/SideBar';
import Toast from './Components/Toast/Toast';
import AllContractsHandler from './Features/AllContracts/AllContractsHandler';

function App() {
  return (
    <>
    <NavBarHandler />
    <SideBar>
    {/* <RevenueProjectionHandler /> */}
    {/* <Toast/> */}
    <AllContractsHandler/>
    </SideBar>
    
    

    
    </>
    
  );
}

export default App;
