import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import AllContracts from './Features/AllContracts/AllContracts';
import MyContracts from './Features/MyContracts/MyContracts';
import Toast from './Components/Toast/Toast';
import AllContractsHandler from './Features/AllContracts/AllContractsHandler';

function App() {
  return (
    <React.Fragment>
    <NavBar/>
    <AllContractsHandler/>
  {/* <Toast/> */}
    {/* <MyContracts/> */}
    </React.Fragment>
  );
}

export default App;
