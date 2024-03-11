import React from "react";
import "./App.css";
import styles from "./App.module.css";
import RevenueProjectionHandler from "./Features/RevenueProjection/RevenueProjectionHandler";
import NavBarHandler from "./Components/NavBar/NavBarHandler";
import SideBar from "./Components/SideBar/SideBar";
import AddContract from "./Features/AddContract/AddContract";

function App() {
  return (
    <div className={styles.body}>
      <NavBarHandler />
      <SideBar />
      <AddContract />
    </div>
  );
}

export default App;
