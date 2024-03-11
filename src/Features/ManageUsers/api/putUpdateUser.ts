import axios from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const updateUser=async(updateUserId:number,selectedRoleId:number|undefined)=>{
    return await axiosInstance
    .put(`api/users/update/${updateUserId}?role_id=${selectedRoleId}`);

}
