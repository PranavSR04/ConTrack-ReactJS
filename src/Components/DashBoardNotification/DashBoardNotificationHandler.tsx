import React, { useEffect, useState } from 'react'
import DashBoardNotification from './DashBoardNotification';
import { DashBoardNotificationHandlerPropType, NotificationType } from './types';

const DashBoardNotificationHandler:React.FC<DashBoardNotificationHandlerPropType>= ({notification}) => {
    const[difference,setDifference]=useState<string>('');  
    useEffect(() => {
        const dateCalculation = (date: Date) => {
          const currentDate = new Date();
          const timeDifference = Math.floor((currentDate.getTime() - date.getTime())/1000);
         
          if (timeDifference < 0) {
            return 'Just now';
          } else if (timeDifference < 60) {
            return `${timeDifference} seconds ago`;
          } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} minutes ago`;
          } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} hours ago`;
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
  return (<DashBoardNotification notification={notification} difference={difference} />
  )
}

export default DashBoardNotificationHandler
