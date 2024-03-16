import React, { useContext, useEffect, useState } from 'react'
import { NotificationProps, NotificationType } from './types';
import styles from './Notification.module.css'
import { Navigate, useNavigate } from 'react-router';
import { NavCon } from '../NavContext/NavContext';


const Notification = ({notification,difference,stylenames}:NotificationProps) => {
    console.log(stylenames)
    const{onClose}=useContext(NavCon);
    const navigate= useNavigate()
 const [actionStyle, setActionStyle]= useState<string>("")   
 const rowClickHandler = (notification:NotificationType) => {
    console.log(notification);
   
    if(!notification.contract_ref_id){
        onClose()
        navigate('/msa')
        
    }
    else {
        onClose()
        navigate(`/contract`, { state: { id: notification.contract_id} });

    }
    
};
useEffect(()=>{
    if (notification.action.includes('Added') ) {  
    setActionStyle(styles[`${styles[stylenames]}added`]);
console.log("this is new style",`${styles[stylenames]}added`)
    } 
    else if (notification.action === 'Edited') {
        setActionStyle(styles[`${styles[stylenames]}edited`]);
    } else if (notification.action === 'Expiring') {
        setActionStyle(styles[`${styles[stylenames]}expiring`]);
    } else if (notification.action === 'Expired') {
        setActionStyle(styles[`${styles[stylenames]}expired`]);
    } else if (notification.action === 'Renewed') {
        setActionStyle(styles[`${styles[stylenames]}renewed`]);
    }
    console.log(notification.client_name)
},[])
  return (
    <div className={`${styles[stylenames]}`} onClick={()=>rowClickHandler(notification)}>
            <div className={actionStyle}>
                <p>{notification.action.toUpperCase()}</p>
            </div>
            <div className={styles[`${styles[stylenames]}cardStyle_right`]}>
                <b>{notification.contract_ref_id ? `  ${notification.contract_ref_id}: Contract ${notification.action} for ${notification.client_name}` :`${notification.msa_ref_id}: Msa ${notification.action} for ${notification.client_name}`}</b>
            </div>
            <div className={styles.difference}>
                <p><b>{difference}</b></p>
            </div>
    </div>
  )
}

export default Notification
