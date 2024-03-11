import axios  from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const getUserList =async (page :number , pageSize :number ,searchQuery1?:string) => {
    return await axiosInstance.get(`api/users/get`, {
        params: {
          current: page,
          pageSize: pageSize,
          search: searchQuery1,
        }
      }) 
} 