import axios  from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const getEmployeeList = async(searchValue:string)=>{
    return await axiosInstance.get(`http://127.0.0.1:8000/api/experion/getexperionlist?${searchValue ? `name=${searchValue}` : ''}`);
}