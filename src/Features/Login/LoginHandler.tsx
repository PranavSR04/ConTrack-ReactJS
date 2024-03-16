import React, { useContext, useState } from "react";
import Login from "./Login";
import {LoginResponse, userDetailsType } from "./types";
import { type FormProps } from "antd";
import { useNavigate } from "react-router";
import { Auth } from "../../Components/AuthContext/AuthContext";
import { AxiosError } from "axios";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Config/authConfig";
import { callMsGraph } from "../../Config/graph";

const LoginHandler = () => {
    
    const {login,handleOk,isModalOpen,handleCancel,errorMsg}= useContext(Auth);

    const navigate=useNavigate();
    const { instance } = useMsal();

    const handleLogin = async (loginType: string) => {
        // setLoading(true);
        if (loginType === "popup") {
            
          try {    
            const response = await instance.loginPopup(loginRequest);
            console.log("hello",response.accessToken)
            const accessToken = response.accessToken;
            const newGraph = await callMsGraph(response.accessToken)         
            // const login_response =  await axios.get('http://127.0.0.1:8000/api/v1/users/login/')
            console.log(newGraph)
            console.log(newGraph.userPrincipalName)
            await login(response);
            // onLoginSuccess();
          } catch (e) {
            console.log('error')
            console.error(e);
          } 
        }
      };

	// const onFinish: FormProps<userDetailsType>["onFinish"] = async (values) => {
	// 	console.log("Success:", values);
	// 	console.log(values);
    //     console.log(values.email_id);
    //     console.log(values.password);
    //     let userDetails:userDetailsType={email_id:values.email_id,password:values.password}
    //     let responce:LoginResponse = await login(userDetails as userDetailsType);
    //     if(responce instanceof AxiosError){
    //         console.log(responce);
    //        }
    //        else{
    //         console.log(responce);
    //         console.log(responce.access_token);
    //         navigate("/Dashboard");
    
    //        }


    
	// };
    
	// const onFinishFailed: FormProps<userDetailsType>["onFinishFailed"] = (
	// 	errorInfo
	// ) => {
	// 	console.log("Failed:", errorInfo);
	// };

	return (
        <Login
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        errorMsg={errorMsg}
        handleLogin={handleLogin}

        />
    );
};

export default LoginHandler;
