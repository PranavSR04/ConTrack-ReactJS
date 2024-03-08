import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import LoginHandler from './Features/Login/LoginHandler';

function App() {
  return (
    <>
    <NavBar />
    <RevenueProjectionHandler />
    <LoginHandler/>

    
    </>
    
  );
}

export default App;
