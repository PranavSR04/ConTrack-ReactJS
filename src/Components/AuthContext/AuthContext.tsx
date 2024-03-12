import React, { createContext,useState } from "react";
import {
	LoginResponse,
	UserType,
	userDetailsType,
} from "../../Features/Login/types";
import { AuthContextType } from "./types";
import { AxiosError } from "axios";
import { postLogin } from "./api/postLogin";
import { useNavigate } from "react-router";
import { postLogout } from "./api/postLogout";

export const Auth = createContext<AuthContextType>({
	accessToken: "",
	currentUser: {
		id: 0,
		email_id: "",
		first_name: "",
		middle_name: "",
		last_name: "",
		created_at: "",
		updated_at: "",
	},
	login: (details: userDetailsType): Promise<LoginResponse | AxiosError> => {
		return postLogin(details);
	},
	logout: (): Promise<void | AxiosError>=>{return Promise.resolve();}
	
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<UserType | undefined>();
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState<string>("");

	const login = async (
		userDetails: userDetailsType
	): Promise<LoginResponse | AxiosError> => {
		console.log(userDetails);
		const response: LoginResponse = await postLogin(userDetails);
		if (!(response instanceof AxiosError)) {
			console.log("Logged User Details",response.contrackUser);
			setCurrentUser(response.user);
            setAccessToken(response.access_token);
            localStorage.clear();

            localStorage.setItem("access_token", response.access_token);
			localStorage.setItem("user_id",response.contrackUser.id.toString());
			const userDesignation = response.contrackUser.user_designation;
			
			// Check if user_designation is not null before storing in localStorage
			if (userDesignation !== null) 
			  localStorage.setItem("user_designation", userDesignation.toString());

			localStorage.setItem("role_id",response.contrackUser.role_id.toString());
			localStorage.setItem("user", JSON.stringify(response.user));
		}
		return response;
	};


	const logout = async (): Promise<void | AxiosError> => {
		try {
			const res = await postLogout();
			// If logout is successful, return void
            console.log(res);
            if(res instanceof AxiosError){
                throw res;
            }else{
                localStorage.clear();
			navigate("/");
			return Promise.resolve();
            }
            
		} catch (error) {
			// If logout fails, return AxiosError
            console.error('Error during logout:', error);
			return Promise.reject(error);
		}
	};

   
	return (
		<div>
			<Auth.Provider value={{ accessToken, currentUser, login, logout }}>
				{children}
			</Auth.Provider>
		</div>
	);
};

export default AuthContext;
