import axios from "axios";
import { MsaDataType } from "../types";
import axiosInstance from "../../../../Config/AxiosConfig";

export const postapi=async(formDatatoSend:FormData,user_id:number)=>{
     await axiosInstance.post(
        `api/msa/add/${user_id}`,
        formDatatoSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

}