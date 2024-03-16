

import './App.css';
import styles from './App.module.css'
import RevenueProjectionHandler from './Features/RevenueProjection/RevenueProjectionHandler';
import React, { useState } from "react";
import NavBarHandler from './Components/NavBar/NavBarHandler';
import ManageUsersHandler from './Features/ManageUsers/ManageUsersHandler';
import FixedFeeHandler from './Features/ContractView/FixedFee/FixedFeeHandler';
import SideBar from './Components/SideBar/SideBar';
import Toast from './Components/Toast/Toast';
import AllContractsHandler from './Features/AllContracts/AllContractsHandler';
import DashBoardNotification from './Components/DashBoardNotification/DashBoardNotification';
import DashBoardNotificationListHandler from './Components/DashBoardNotificationList/DashBoardNotificationListHandler';
import NavContext from './Components/NavContext/NavContext';
import AddContract from './Features/AddContract/AddContract';
import AddContractHandler from "./Features/AddContract/AddContractHandler";
import { PageLayout } from './Features/Login/PageLayout'
  import { loginRequest } from './Config/authConfig';
  import { callMsGraph } from './Config/graph';
  import { ProfileData } from './Features/Login/ProfileData';
    import Button from "react-bootstrap/Button";


 import {
   AuthenticatedTemplate,
   UnauthenticatedTemplate,
   useMsal,
 } from "@azure/msal-react";


function App() {
  const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            });
    }
  return (
    <>
    <>
            <h5 className="card-title">Welcome {accounts[0]?.name}</h5>
            <br/>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
        </>
    

    
    </>
  );
}

export default App;
