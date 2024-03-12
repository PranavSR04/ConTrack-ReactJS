import axios from "axios";
import { MsaDataType } from "../types";
import axiosInstance from "../../../../Config/AxiosConfig";

export const postapi=async(formDatatoSend:FormData, msa_ref_id: string| undefined)=>{
    axiosInstance.post(
        `api/msa/update/1?msa_ref_id=${msa_ref_id}`,
        formDatatoSend,
        
      );

}