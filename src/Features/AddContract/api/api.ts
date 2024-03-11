import axios from "axios";
import { ContractDetails } from "../types/AddContractTypes";

const API_BASE_URL = "http://127.0.0.1:8000/api/contracts";

export const addContract = async (contractData: ContractDetails) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addcontracts`,
      contractData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTAxMzgwNjEsImV4cCI6MTcxMDE0MTY2MSwibmJmIjoxNzEwMTM4MDYxLCJqdGkiOiJMSzI1STdHeHpTOWc3c2kxIiwic3ViIjoiMSIsInBydiI6IjQ5YjhiYTJiYWU4ZDA2ZGI0ODhmYzk5NjE2YzEwOGYxYmExYWRjNTEifQ.ZmOGydQvWEiGTNSffIiA8-wQJHpL9V-UfgGxXuNumXo",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong while adding the contract.");
  }
};
