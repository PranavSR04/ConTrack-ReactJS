import axios from "axios";
import { ContractDetails } from "../types";
import axiosInstance from "../../../Config/AxiosConfig";
import { EditContractDetails } from "../types/editcontract";

export const editContract = async (contractData: EditContractDetails) => {
  try {
    const response = await axiosInstance.post(
      `/api/contracts/edit/${contractData.msa_id}`,
      contractData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong while editing the contract.");
  }
};
