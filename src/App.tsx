

import './App.css';
import styles from './App.module.css'

import React, { useState } from 'react';

  import { PageLayout } from './Features/Login/PageLayout'
  import { loginRequest } from './Config/authConfig';
  import { callMsGraph } from './Config/graph';
  import { ProfileData } from './Features/Login/ProfileData';

  import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

  import './App.css';

  import Button from 'react-bootstrap/Button';

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
