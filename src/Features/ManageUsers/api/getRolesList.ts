import axios from "axios";
import axiosInstance from "../../../Config/AxiosConfig";
export const getRolesList =async()=>{
    return await axiosInstance.get("http://127.0.0.1:8000/api/role/details");
}