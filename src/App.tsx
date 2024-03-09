import React from 'react';
import './App.css';
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';
import ManageUsersHandler from './Features/ManageUsers/ManageUsersHandler';


function App() {
  return (
    <>
    <NavBarHandler/>
    <ManageUsersHandler/>
    </>
  );
}

export default App;
