import axios from "axios";
import { User } from "../types";
import axiosInstance from "../../../Config/AxiosConfig";

export const deleteUser=async(selectedUser:User):Promise<void>=>{
    return await axiosInstance.put(`http://127.0.0.1:8000/api/users/updateuser/${selectedUser!.id}?is_active=0`);
}
