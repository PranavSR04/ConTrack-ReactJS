import React from 'react';

import './App.css';
import styles from './App.module.css'
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';
import ManageUsersHandler from './Features/ManageUsers/ManageUsersHandler';
import FixedFeeHandler from './Features/ContractView/FixedFee/FixedFeeHandler';
import SideBar from './Components/SideBar/SideBar';
import Toast from './Components/Toast/Toast';
import AllContractsHandler from './Features/AllContracts/AllContractsHandler';
import DashBoardNotification from './Components/DashBoardNotification/DashBoardNotification';
import DashBoardNotificationListHandler from './Components/DashBoardNotificationList/DashBoardNotificationListHandler';
import NavContext from './Components/NavContext/NavContext';


function App() {
  return (
    <>
    <NavContext>
    <NavBarHandler />
    <SideBar>
      <RevenueProjectionHandler />
      <DashBoardNotificationListHandler/>
    </SideBar>
    </NavContext>
    

    
    </>
  );
}

export default App;
