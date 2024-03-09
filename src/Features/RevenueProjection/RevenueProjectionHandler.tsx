import React, { useContext } from 'react'
import RevenueProjection from './RevenueProjection'
import { Auth } from '../../Components/AuthContext/AuthContext';

const RevenueProjectionHandler = () => {

    const {logout}= useContext(Auth);
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
    
    



  return (
   <RevenueProjection
   handleLogout={handleLogout}
   />
  )
}

export default RevenueProjectionHandler
