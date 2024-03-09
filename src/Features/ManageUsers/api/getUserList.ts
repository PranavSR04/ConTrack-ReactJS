import axios  from "axios";


export const getUserList =async (page :number , pageSize :number ,searchQuery1?:string) => {
    return await axios.get(`http://127.0.0.1:8000/api/users/getusers`, {
        params: {
          current: page,
          pageSize: pageSize,
          search: searchQuery1,
        }}) 
} 