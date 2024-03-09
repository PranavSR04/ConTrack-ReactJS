import axios, { AxiosError } from "axios";
import { LoginResponse, userDetailsType } from "../../../Features/Login/types";
import axiosInstance from "../../../Config/AxiosConfig";

export const postLogout = async (): Promise<void | AxiosError> => {
    console.log("hello");
    return await axiosInstance  
        .post("api/auth/logout")
        .then(() => {})
        .catch((error) => error);
};