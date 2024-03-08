import React, { createContext, useState } from 'react'
import { userDetailsType } from '../../Features/Login/types';
import { AuthContextType } from './types';
import { AxiosError } from 'axios';
import { postLogin } from './api/postLogin';
import { useNavigate } from 'react-router';

export const Auth = createContext<AuthContextType>({
	mail: "",
	login: (details:userDetailsType):Promise<{message:string} |AxiosError> => {return postLogin(details)},
	logout:()=>{}
});

const AuthContext = ({ children }:{children:React.ReactNode}) => {
    const [mail, setMail] = useState("");
	const login = async (userDetails:userDetailsType):Promise<{message:string} |AxiosError> => {
		console.log(userDetails);
		setMail(userDetails.usermail);
		return await postLogin(userDetails);
	};
    const navigate = useNavigate();
	const logout = () => {
        navigate('/')

    };
  return (
    <div>
      <Auth.Provider value={{ mail, login,logout }}>{children}</Auth.Provider>
    </div>
  )
}

export default AuthContext
