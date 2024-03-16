import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Config/authConfig";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { callMsGraph } from "../../Config/graph";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package 
 */

export const SignInButton = () => {
  const { instance } = useMsal();

//   const handleLogin = async (loginType: string) => {
//     if (loginType === "popup") {
//       await instance.loginPopup(loginRequest).catch((e) => {
//         console.log(e);
//       });
//     } else if (loginType === "redirect") {
//       await instance.loginRedirect(loginRequest).catch((e) => {
//         console.log(e);
//       });
//     }
//   };
  
const handleLogin = async (loginType: string) => {
    // setLoading(true);
    if (loginType === "popup") {
        console.log("HElooooo");
      try {
        console.log("%%%%");

        const response = await instance.loginPopup(loginRequest);
        console.log("hello",response.accessToken)
        const accessToken = response.accessToken;
        const newGraph = await callMsGraph(response.accessToken)
        // const login_response =  await axios.get('http://127.0.0.1:8000/api/v1/users/login/')
        console.log(newGraph)
        console.log(newGraph.userPrincipalName)
        // navigate('/home')
        // onLoginSuccess();
      } catch (e) {
        console.log('error')
        console.error(e);
      } 
    }
  };

return (

    <DropdownButton
      variant="secondary"
      className="ml-auto"
      drop="start"
      title="Sign In"
    >
      <Dropdown.Item as="button" onClick={() => handleLogin("popup")}>
        Sign in using Microsoft Account
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>
        Sign in using Redirect
      </Dropdown.Item>
    </DropdownButton>
  );
};
