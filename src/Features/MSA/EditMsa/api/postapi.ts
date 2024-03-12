import axios from "axios";
import { MsaDataType } from "../types";
import axiosInstance from "../../../../Config/AxiosConfig";

export const postapi=async(formDatatoSend:FormData)=>{
    axiosInstance.post(
        `api/msa/update/1`,
        formDatatoSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Accept': 'application/json, text/plain, */*',
          },
        }
      );

}