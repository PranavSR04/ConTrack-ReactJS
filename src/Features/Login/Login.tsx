import React from "react";
import { Button, Card, Form, Input, Modal } from "antd";
import { LoginPropType, userDetailsType } from "./types";
import styles from "./Login.module.css";
import logo from "../../img/Subtract.png";
import { SignInButton } from "./AzureSignin";
import microsoft from '../../img/microsoft.png'


const Login = ({  handleOk,isModalOpen,handleCancel,errorMsg,handleLogin}: LoginPropType) => {
	return (
		<>
			<div className={styles.container}>
				{/* <div className={styles.logo}>
					<img src={logo} alt="contrack logo" className={styles.logoimg} />
					ConTrack
				</div> */}
				<div className={styles.leftTotal}>
				<div className={styles.left}>
					<img src={logo} alt="contrack logo" className={styles.logoimg} />
					<h1 className={styles.heading}>
						ConTrack <br></br>
					</h1>
				</div>
				<p className={styles.tagline}>- Your tool for tracking and managing contracts</p>
				</div>
					<div className={styles.right}>
						<Card className={styles.card}>
							<h6>Welcome </h6>
						{/* <h4>Login </h4> */}
						<img src={microsoft} alt="MS Logo"  className={styles.microsoftLogo}/>
						<Button className={styles.microsoftButton}
						onClick={()=>handleLogin("popup")}>
							Login with Microsoft
						</Button>
						{/* <SignInButton/> */}
						{/* <Form
							name="loginform"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							style={{ maxWidth: 500, marginTop: "6rem" }}
						>
							<Form.Item<userDetailsType>
								label="Email  ID "
								name="email_id"
								rules={[
									{ required: true, message: "Please input your mail id!" },
								]}
							>
								<Input style={{marginLeft:5,width:"410px"}} />
							</Form.Item>
							<Form.Item<userDetailsType>
								label="Password"
								name="password"
								rules={[
									{ required: true, message: "Please input your password!" },
								]}
							>
								<Input.Password style={{width:"410px"}}/>
							</Form.Item>
							<Form.Item wrapperCol={{ offset: 12, span: 16 }}>
								<Button type="primary" htmlType="submit">
									Login
								</Button>
							</Form.Item>
						</Form> */}
					</Card>
				</div>
				<Modal
					title="Login Failed"
					open={isModalOpen}
					onCancel={handleCancel}
				    onOk={handleOk}
					footer={null}
					
				>
					<p>{errorMsg}</p>
					
				</Modal>
			</div>
		</>
	);
};

export default Login;
