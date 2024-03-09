import axios from "axios";

export const addUser=async(selectedEmployeeId:number,selectedRoleId:number)=>{
    return await axios.post("http://127.0.0.1:8000/api/users/adduser", {
        experion_id: selectedEmployeeId,
        role_id: selectedRoleId, 
      });
}