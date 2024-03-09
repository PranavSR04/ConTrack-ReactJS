import axios, { AxiosError } from "axios";
import { LoginResponse, userDetailsType } from "../../../Features/Login/types";
import axiosInstance from "../../../Config/AxiosConfig";

export const postLogin = async ({
	email_id,
	password,
}: userDetailsType): Promise<LoginResponse | AxiosError> => {
	return await axiosInstance
		.post("api/auth/login", { email_id, password })
		.then((responce) => responce.data)
		.catch((err) => err);
};

export const postLogout = async (): Promise<void | AxiosError> => {
    console.log("hello");
    return await axiosInstance  
        .post("api/auth/logout")
        .then(() => {})
        .catch((error) => error);
};