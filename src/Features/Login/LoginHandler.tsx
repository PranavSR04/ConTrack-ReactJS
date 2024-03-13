import React, { useContext, useState } from "react";
import Login from "./Login";
import {LoginResponse, userDetailsType } from "./types";
import { type FormProps } from "antd";
import { useNavigate } from "react-router";
import { Auth } from "../../Components/AuthContext/AuthContext";
import { AxiosError } from "axios";

const LoginHandler = () => {
    
    const {login,handleOk,isModalOpen,handleCancel,errorMsg}= useContext(Auth);

    const navigate=useNavigate();
   

	const onFinish: FormProps<userDetailsType>["onFinish"] = async (values) => {
		console.log("Success:", values);
		console.log(values);
        console.log(values.email_id);
        console.log(values.password);
        let userDetails:userDetailsType={email_id:values.email_id,password:values.password}
        let responce:LoginResponse = await login(userDetails as userDetailsType);
        if(responce instanceof AxiosError){
            console.log(responce);
           }
           else{
            console.log(responce);
            console.log(responce.access_token);
            navigate("/Dashboard");
    
           }


    
	};
    

	const onFinishFailed: FormProps<userDetailsType>["onFinishFailed"] = (
		errorInfo
	) => {
		console.log("Failed:", errorInfo);
	};
	return (
        <Login
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        errorMsg={errorMsg}

        />
    );
};

export default LoginHandler;
