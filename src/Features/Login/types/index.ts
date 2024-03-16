import { AxiosError } from "axios";
import { ValidateErrorEntity } from "rc-field-form/es/interface";

export type userDetailsType ={email_id:string;access_token:string}

export interface LoginPropType{
    // onFinish:(values: userDetailsType) => void;
    // onFinishFailed: (errorInfo: ValidateErrorEntity<userDetailsType>) => void;
    isModalOpen:boolean,
    handleOk:()=>void,
    handleCancel:()=>void,
    errorMsg:string,
    handleLogin:(loginType: string) => Promise<void>
} 

// Interface for the user object within the successful response
export interface UserType {
    id: number;
    email_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
   
}
export interface ContarckUserType {
 
        id:string;
        experion_id: number;
        role_id: number;
        user_mail: string;
        user_name: string;
        user_designation: string | null;
        group_name: string | null;
        is_active: number;
        created_at: string;
        updated_at: string;
}



// Interface for the successful response
export interface LoginResponseType {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: UserType;
    contrackUser:ContarckUserType;
}

// Union type for both successful response and error response
export type LoginResponse = LoginResponseType | AxiosError;
