import React from "react";
import { Button,  Form,Input } from "antd";
import { LoginPropType, userDetailsType } from "./types";




const Login = (
    {
        onFinish,
        onFinishFailed
    }:LoginPropType
) => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-6"></div>
				<div className="col-md-6 border-left">
					<Form
						name="loginform"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						style={{ maxWidth: 500, margin: "100px", marginTop: "150px" }}
					>
						<Form.Item<userDetailsType>
							label="Usermail"
							name="usermail"
							rules={[
								{ required: true, message: "Please input your mail id!" },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item<userDetailsType>
							label="Password"
							name="password"
							rules={[
								{ required: true, message: "Please input your password!" },
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 12, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Login;
