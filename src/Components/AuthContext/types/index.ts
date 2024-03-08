import { AxiosError } from "axios";
import { userDetailsType } from "../../../Features/Login/types";

export type AuthContextType={
	mail:string;
	login:(details:userDetailsType)=>Promise<{message:string} |AxiosError>;
	logout:()=>void;
}
