import React, { useContext, useEffect, useState } from 'react'
import { NotificationType } from './types';
import styles from './Notification.module.css'
import { Navigate, useNavigate } from 'react-router';
import { NavCon } from '../NavContext/NavContext';
interface NotificationProps {
    notification: NotificationType;
    difference: string;
}

const Notification:React.FC<NotificationProps> = ({notification,difference}) => {
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
                setActionStyle(styles.added);
    } 
    else if (notification.action === 'Edited') {
        setActionStyle(styles.edited);
    } else if (notification.action === 'Expiring') {
        setActionStyle(styles.expiring);
    } else if (notification.action === 'Expired') {
        setActionStyle(styles.expired);
    } else if (notification.action === 'Renewed') {
        setActionStyle(styles.renewed);
    }
    console.log(notification.client_name)
},[])
  return (
    <div className={styles.cardStyle} onClick={()=>rowClickHandler(notification)}>
            <div className={actionStyle}>
                <p>{notification.action.toUpperCase()}</p>
            </div>
            <div className={styles.cardStyle_right}>
            {/* <b>{notification.contract_ref_id ?` ${refid}=${notification.contract_id} ${refpage}='contract' ${notification.contract_ref_id}: Contract ${notification.action} for ${notification.client_name}` :`${refid}=${notification.msa_id} ${refpage}='msa'${notification.msa_ref_id}: Msa ${notification.action} for ${notification.client_name}`}</b> */}

                <b>{notification.contract_ref_id ? `  ${notification.contract_ref_id}: Contract ${notification.action} for ${notification.client_name}` :`${notification.msa_ref_id}: Msa ${notification.action} for ${notification.client_name}`}</b>
            </div>
            <div className={styles.difference}>
                <p><b>{difference}</b></p>
            </div>
    </div>
  )
}

export default Notification
