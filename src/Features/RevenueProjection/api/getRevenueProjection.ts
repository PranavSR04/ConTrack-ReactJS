import axios, { AxiosError } from "axios";


export const fetchRevenueProjection = async (id?:number) =>{
    return await axios 
    .get(`http://127.0.0.1:8000/api/revenue/projection/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
}