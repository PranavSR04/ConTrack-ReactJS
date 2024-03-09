import axios  from "axios";

export const getEmployeeList = async(searchValue:string)=>{
    return await axios.get(`http://127.0.0.1:8000/api/experion/getexperionlist?${searchValue ? `name=${searchValue}` : ''}`);
}