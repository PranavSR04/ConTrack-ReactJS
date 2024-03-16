import { AxiosError } from "axios";
import { ContarckUserType, LoginResponse, UserType } from "../../../Features/Login/types";
import { AuthenticationResult } from "@azure/msal-common";

export type AuthContextType={
	accessToken:string ;
	currentUser:ContarckUserType | undefined;
	login: (responce: AuthenticationResult) => Promise<LoginResponse | AxiosError>
	handleLogout: (logoutType: string) => void
	handleOk:()=>void;
	isModalOpen:boolean;
	handleCancel:()=>void;
	errorMsg:string;
	roleId:number | undefined ;
	logout:() => Promise<void | AxiosError>;

}
