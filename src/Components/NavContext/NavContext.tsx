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

    const showDrawer = async() => {
      setOpen(true);
      const user: userType = { user_id: 1 };
      const response = await postNotificationStatus(user);
      console.log("hi")
    };
   
    const onClose = () => {
        setOpen(false);
      };
  return (
    <NavCon.Provider value={{showDrawer,open,onClose,activeNotificationCount,setActiveNotificationCount}}>
            {children}
    </NavCon.Provider>
  )
}

export default NavContext

