import React, { useContext, useEffect, useState } from 'react'
import RevenueProjection from './RevenueProjection'
import { Auth } from '../../Components/AuthContext/AuthContext';
import { fetchRevenueProjection } from './api/getRevenueProjection';

const RevenueProjectionHandler = () => {

    const {logout}= useContext(Auth);
    const [revuneData,setRevenueData]=useState();
    const access_token = localStorage.getItem('access_token');
    const handleLogout = async () => {
        try {
            access_token && await logout(); // Assuming logout function does not require parameters
          // Optionally, redirect or perform any other action after logout
        } catch (error) {
          // Handle any potential errors from the logout operation
          console.error('Error during logout:', error);
        }
      };

      
        const fetRevenue = async () =>{
          const data = await fetchRevenueProjection();
          console.log(data);
        }
        


    
    



  return (
   <RevenueProjection
   handleLogout={handleLogout}
   fetRevenue={fetRevenue}
   />
  )
}

export default RevenueProjectionHandler


