import { ValidateErrorEntity } from "rc-field-form/es/interface";

export type userDetailsType ={usermail:string;password:string}

export interface LoginPropType{
    onFinish:(values: userDetailsType) => void;
    onFinishFailed: (errorInfo: ValidateErrorEntity<userDetailsType>) => void;
} 