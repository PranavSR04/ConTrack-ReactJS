import React, { useEffect, useState } from 'react'
import { DashBoardNotificationHandlerPropType} from './types';
import Notification from '../Notification/Notification';

const DashBoardNotificationHandler:React.FC<DashBoardNotificationHandlerPropType>= ({notification}) => {
    const[difference,setDifference]=useState<string>(''); 
    const stylename='DashBoardStyle'; //For giving styles
    useEffect(() => {
         //Function to calculate time difference between current time and provided date.
          const dateCalculation = (date: Date) => {
          const currentDate = new Date();
          const timeDifference = Math.floor((currentDate.getTime() - date.getTime())/1000);
         //return the time with display content
          if (timeDifference < 0) {
            return 'Just now';
          } else if (timeDifference < 60) {
            return `${timeDifference} sec ago`;
          } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} mins ago`;
          } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} hrs ago`;
          } else if (timeDifference < 604800) {
            const days = Math.floor(timeDifference / 86400);
            return `${days} days ago`;
          } else if (timeDifference < 2592000) {
            const weeks = Math.floor(timeDifference / 604800);
            return `${weeks} weeks ago`;
          } else if (timeDifference < 31536000) {
            const months = Math.floor(timeDifference / 2592000);
            return `${months} months ago`;
          } else {
            const years = Math.floor(timeDifference / 31536000);
            return `${years} years ago`;
          }
        };
    
        const updatedDate = new Date(notification.updated_at);
        const calculatedDifference = dateCalculation(updatedDate);
        setDifference(calculatedDifference);
      }, [notification.updated_at]);
  return (<Notification notification={notification} difference={difference} stylenames={stylename}/>
  )
}

export default DashBoardNotificationHandler
