import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import AddContract from './Features/AddContract/AddContract';

function App() {
  return (
    <>
      <NavBar />
      <AddContract />
    </>
  );
}

export default App;
