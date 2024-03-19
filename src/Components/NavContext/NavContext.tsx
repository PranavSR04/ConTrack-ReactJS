import React, { createContext, useState } from 'react'
import { NavPropType } from './types'
import { postNotificationStatus } from '../NotificationList/Api/putNotificationCountStatus';
import { userType } from '../NotificationList/types';

export const NavCon=createContext<NavPropType>({
    showDrawer:()=>{},
    open:true,
    onClose:()=>{},
    setActiveNotificationCount:()=>{},
    activeNotificationCount:1
})
const NavContext = ({ children }: { children: React.ReactNode }) =>  {
    const [open, setOpen] = useState(false);
    const [activeNotificationCount, setActiveNotificationCount] = useState<number>(0);
    const SENDTO_ID = parseInt(localStorage.getItem("user_id") || '0', 10);
    const showDrawer = async() => {
      setOpen(true);
      const user: userType = { user_id: SENDTO_ID };
      const response = await postNotificationStatus(user);
      console.log("response data",response)
    };
   
    const onClose = () => {
        setOpen(false);
        setActiveNotificationCount(0);
      };
  return (
    <NavCon.Provider value={{showDrawer,open,onClose,activeNotificationCount,setActiveNotificationCount}}>
            {children}
    </NavCon.Provider>
  )
}

export default NavContext

