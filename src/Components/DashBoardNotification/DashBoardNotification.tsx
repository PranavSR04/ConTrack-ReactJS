// import React from 'react'
// import { DashBoardNotificationPropType, NotificationType } from './types';
// import styles from './DashBoardNotification.module.css'
// import { useNavigate } from 'react-router';
// const DashBoardNotification:React.FC<DashBoardNotificationPropType> = ({notification,difference}) => {
//   let actionStyle = '';
//   const navigate= useNavigate()
//   const rowClickHandler = (notification:NotificationType) => {
//     console.log(notification);
   
//     if(!notification.contract_ref_id){
//         navigate('/msa')
        
//     }
//     else {
//         navigate(`/contract`, { state: { id: notification.contract_id} });

//     }
    
// };
//   if (notification.action === 'Added ') {
//       actionStyle = styles.added;
//   } else if (notification.action === 'Edited') {
//       actionStyle = styles.edited;
//   } else if (notification.action === 'Expiring') {
//       actionStyle = styles.expiring;
//   } else if (notification.action === 'Expired') {
//       actionStyle = styles.expired;
//   } else if (notification.action === 'Renewed') {
//       actionStyle = styles.renewed;
//   }
//   return (
//     <div className={styles.container} onClick={()=>rowClickHandler(notification)}>
//       <div className={styles.container_text}><p> <b>{notification.contract_ref_id ? `${notification.contract_ref_id}: Contract ${notification.action} for ${notification.client_name}` : `${notification.msa_ref_id}: Msa ${notification.action} for ${notification.client_name}`}</b></p></div>
//       <div className={`${styles.container_action} ${actionStyle}`}><p><b>{notification.action}</b></p></div>
//       <div className={styles.container_time}><p><b>{difference}</b></p></div>
//     </div>
//   )
// }

// export default DashBoardNotification
import React from 'react'

const DashBoardNotification = () => {
  return (
    <div>
      
    </div>
  )
}

export default DashBoardNotification

