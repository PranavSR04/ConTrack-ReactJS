import axios from "axios";

export const getRolesList =async()=>{
    return await axios.get("http://127.0.0.1:8000/api/role/details");
}