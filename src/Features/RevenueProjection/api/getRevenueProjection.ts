import axiosInstance from "../../../Config/AxiosConfig";


export const fetchRevenueProjection = async (id?:number) =>{
    let url = 'api/revenue/projection/';
    if (id !== undefined) {
        url += id;
    }

    return await axiosInstance
        .get(url)
        .then((res) => res.data)
        .catch((err) => err);
}