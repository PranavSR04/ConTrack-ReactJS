import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import AllContracts from './Features/AllContracts/AllContracts';
import MyContracts from './Features/MyContracts/MyContracts';

function App() {
  return (
    <React.Fragment>
    <NavBar/>
    <AllContracts/>
    {/* <MyContracts/> */}
    </React.Fragment>
  );
}

export default App;
