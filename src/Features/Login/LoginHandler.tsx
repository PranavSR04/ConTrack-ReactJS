import React from "react";
import Login from "./Login";
import { userDetailsType } from "./types";
import { type FormProps } from "antd";

const LoginHandler = () => {
	const onFinish: FormProps<userDetailsType>["onFinish"] = (values) => {
		console.log("Success:", values);
		console.log(values);
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
        />
    );
};

export default LoginHandler;
