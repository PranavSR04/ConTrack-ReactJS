import React from "react";
import { Button, Card, Form, Input, Modal } from "antd";
import { LoginPropType, userDetailsType } from "./types";
import styles from "./Login.module.css";
import logo from "../../img/Subtract.png";

const Login = ({ onFinish, onFinishFailed ,handleOk,isModalOpen,handleCancel}: LoginPropType) => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.logo}>
					<img src={logo} alt="contrack logo" className={styles.logoimg} />
					ConTrack
				</div>
				<div className={styles.left}>
					<h1 className={styles.heading}>
						Contract <br></br>Management <br></br>System
					</h1>
				</div>
				<div className={styles.right}>
					<Card className={styles.card}>
						<h4>Login </h4>
						<Form
							name="loginform"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							style={{ maxWidth: 500, marginTop: "6rem" }}
						>
							<Form.Item<userDetailsType>
								label="Usermail"
								name="email_id"
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
					</Card>
				</div>
				<Modal
					title="Unauthorized"
					open={isModalOpen}
					onCancel={handleCancel}
				    onOk={handleOk}
					footer={null}
					
				>
					<p>You don't have access.</p>
					
				</Modal>
			</div>
		</>
	);
};

export default Login;
