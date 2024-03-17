import React, { createContext, useState } from "react";
import {ContarckUserType, LoginResponse,UserType} from "../../Features/Login/types";
import { AuthContextType } from "./types";
import { AxiosError } from "axios";
import { postLogin } from "./api/postLogin";
import { useNavigate } from "react-router";
import { postLogout } from "./api/postLogout";
import { AuthenticationResult } from "@azure/msal-common";
import { useMsal } from "@azure/msal-react";

export const Auth = createContext<AuthContextType>({
	accessToken: "",
	currentUser: {
		id:'',
        experion_id: 1,
        role_id: 1,
        user_mail: '',
        user_name: '',
        user_designation: null,
        group_name: null,
        is_active: 1,
        created_at: '',
        updated_at: '',
	},
	login: (
		responce: AuthenticationResult
	): Promise<LoginResponse | AxiosError> => {
		return postLogin(responce.accessToken);
	},
	handleLogout: (): Promise<void | AxiosError> => {
		return Promise.resolve();
	},
	logout:():Promise<void | AxiosError>=>{ return Promise.resolve();
	},
	isModalOpen: false,
	handleOk: () => {},
	handleCancel: () => {},
	errorMsg: "",
	roleId:1,
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<ContarckUserType| undefined>();
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState<string>("");
	const [roleId,setRoleId] =useState<number>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string>("");
	const { instance } = useMsal();


	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const login = async (
		responce: AuthenticationResult
	): Promise<LoginResponse | AxiosError> => {

		const contrack_response: LoginResponse = await postLogin(
			responce.accessToken
		);
		console.log(contrack_response);
		if (!(contrack_response instanceof AxiosError)) {
			console.log("Logged User Details", contrack_response.contrackUser);
			setCurrentUser(contrack_response.contrackUser);
			setAccessToken(contrack_response.access_token);
			setRoleId(contrack_response.contrackUser.role_id);
			localStorage.clear();
			localStorage.setItem("access_token", contrack_response.access_token);
			contrack_response.contrackUser.id? localStorage.setItem("user_id",contrack_response.contrackUser.id.toString())
				: localStorage.setItem("user_id", "");

			localStorage.setItem("role_id",contrack_response.contrackUser.role_id.toString());
			localStorage.setItem("user", JSON.stringify(contrack_response.user));
			navigate('/Dashboard');
		} else {
			showModal();
			console.log((contrack_response.response?.data as any)?.error);
			setErrorMsg((contrack_response.response?.data as any)?.error);
		}
		return contrack_response;
	};

	const logout = async (): Promise<void | AxiosError> => {
		try {
			const res = await postLogout();
			// If logout is successful, return void
			console.log(res);
			if (res instanceof AxiosError) {
				throw res;
			} else {
				localStorage.clear();
				navigate("/");
				return Promise.resolve();
			}
		} catch (error) {
			// If logout fails, return AxiosError
			console.error("Error during logout:", error);
			return Promise.reject(error);
		}
	};
	const handleLogout = (logoutType: string) => {
		if (logoutType === "popup") {
		  instance.logoutPopup({
			postLogoutRedirectUri: "/",
			mainWindowRedirectUri: "/",
		  });
		} else if (logoutType === "redirect") {
		  instance.logoutRedirect({
			postLogoutRedirectUri: "/",
		  });
		}
	  };
	return (
		<div>
			<Auth.Provider
				value={{
					accessToken,
					currentUser,
					login,
					handleLogout,
					isModalOpen,
					handleOk,
					handleCancel,
					errorMsg,
					roleId,
					logout
				}}
			>
				{children}
			</Auth.Provider>
		</div>
	);
};

export default AuthContext;
