import axios, { AxiosError } from 'axios';
import { userDetailsType } from "../../../Features/Login/types";

export const postLogin = async ({ usermail, password }: userDetailsType): Promise<{message:string} | AxiosError> => {
    return await axios.post("https://90ade0cb-a8dd-4023-bc45-f557d8be138a.mock.pstmn.io/login", { usermail, password })
        .then(data => data.data)
};