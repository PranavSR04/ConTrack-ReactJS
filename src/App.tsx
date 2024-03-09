import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import ManageUsersHandler from './Features/ManageUsers/ManageUsersHandler';

function App() {
  return (
    <>
    <NavBar/>
    <ManageUsersHandler/>
    </>
  );
}

export default App;
