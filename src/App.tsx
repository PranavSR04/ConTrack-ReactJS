import React from 'react';
import './App.css';
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';
import Toast from './Components/Toast/Toast';
import AllContractsHandler from './Features/AllContracts/AllContractsHandler';

function App() {
  return (
    <>
    <NavBarHandler />
    <RevenueProjectionHandler />
    <Toast/>

    

    
    </>
    
  );
}

export default App;
