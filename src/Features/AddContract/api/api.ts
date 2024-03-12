import axios from "axios";
import { ContractDetails } from "../types/AddContractTypes";
import axiosInstance from "../../../Config/AxiosConfig";

// const API_BASE_URL = "http://127.0.0.1:8000/api/contracts";

export const addContract = async (contractData: ContractDetails) => {
  try {
    console.log("From api fromtend", contractData);

    const response = await axiosInstance.post(
      `/api/contracts/add`,
      contractData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept:"application/json"
        },
      }
    );

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong while adding the contract.");
  }
};
