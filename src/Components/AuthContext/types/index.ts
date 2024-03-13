import { AxiosError } from "axios";
import { LoginResponse, UserType, userDetailsType } from "../../../Features/Login/types";

export type AuthContextType={
	accessToken:string ;
	currentUser:UserType | undefined;
	login: (userDetails: userDetailsType) => Promise<LoginResponse | AxiosError>;
	logout: () => Promise<void | AxiosError>
	handleOk:()=>void;
	isModalOpen:boolean;
	handleCancel:()=>void;
	errorMsg:string;

}
