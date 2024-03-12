import axiosInstance from "../../../Config/AxiosConfig"

export const getMSA = async (searchvalue?:string) =>{
 return await axiosInstance
   .get(`/api/msa/list? ${searchvalue? `client_name=${searchvalue}`:''}`)
   .then((res) => res.data)
   .catch((err) => err);
}