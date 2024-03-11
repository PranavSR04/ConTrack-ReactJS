import React from 'react';
import './App.css';
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import NavBarHandler from './Components/NavBar/NavBarHandler';
import SideBar from './Components/SideBar/SideBar';
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
