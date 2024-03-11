import { AxiosError } from "axios";
import { ContractApiType } from "../types";
import axiosInstance from "../../../../Config/AxiosConfig";

export const getContractData = async ():Promise<ContractApiType| AxiosError> => {
  return await axiosInstance
    .get(`/api/contract/list/2`)
    .then((res) => res.data)
    .catch((err) => err);
};
