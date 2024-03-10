import axios from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const addUser=async(selectedEmployeeId:number,selectedRoleId:number)=>{
    return await axiosInstance.post("http://127.0.0.1:8000/api/users/adduser", {
        experion_id: selectedEmployeeId,
        role_id: selectedRoleId, 
      });
}