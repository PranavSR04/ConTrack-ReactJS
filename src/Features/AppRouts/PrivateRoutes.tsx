import React, { useContext } from 'react'
import { Auth } from '../../Components/AuthContext/AuthContext'
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}:{ children: React.ReactNode }) => {
    const {currentUser} = useContext(Auth);
    if(!currentUser){
        return <Navigate to='/' />
    }
  return <>{children}</>;
}

export default PrivateRoutes
