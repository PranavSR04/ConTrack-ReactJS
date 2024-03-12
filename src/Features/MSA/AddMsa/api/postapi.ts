import axios from "axios";
import { MsaDataType } from "../types";
import axiosInstance from "../../../../Config/AxiosConfig";

export const postapi=async(formDatatoSend:FormData)=>{
     await axiosInstance.post(
        `api/msa/add/1`,
        formDatatoSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

}