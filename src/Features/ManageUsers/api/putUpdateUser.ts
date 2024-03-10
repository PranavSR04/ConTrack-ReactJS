import axios from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const updateUser=async(updateUserId:number,selectedRoleId:number|undefined)=>{
    return await axiosInstance.put(`http://127.0.0.1:8000/api/users/updateuser/${updateUserId}?role_id=${selectedRoleId}`);
}