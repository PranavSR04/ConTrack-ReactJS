import React from 'react';
import './App.css';
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';
import FixedFeeHandler from './Features/ContractView/FixedFee/FixedFeeHandler';
import SideBar from './Components/SideBar/SideBar';


function App() {
  return (
    <>
    <NavBarHandler />
    <SideBar>
    <FixedFeeHandler/>
    </SideBar>

    
    </>
    
  );
}

export default App;
