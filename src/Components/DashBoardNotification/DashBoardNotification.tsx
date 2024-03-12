import React from 'react'
import { DashBoardNotificationPropType, NotificationType } from './types';
import styles from './DashBoardNotification.module.css'
const DashBoardNotification:React.FC<DashBoardNotificationPropType> = ({notification,difference}) => {
  let actionStyle = '';

  if (notification.action === 'Added') {
      actionStyle = styles.added;
  } else if (notification.action === 'Editted') {
      actionStyle = styles.edited;
  } else if (notification.action === 'Expiring') {
      actionStyle = styles.expiring;
  } else if (notification.action === 'Expired') {
      actionStyle = styles.expired;
  } else if (notification.action === 'Renewed') {
      actionStyle = styles.renewed;
  }
  return (
    <div className={styles.container}>
      <div className={styles.container_text}><p> <b>{notification.contract_id ? `${notification.contract_id}: Contract ${notification.action} for ${notification.client_name}` : `${notification.msa_id}: Msa ${notification.action} for ${notification.client_name}`}</b></p></div>
      <div className={`${styles.container_action} ${actionStyle}`}><p><b>{notification.action}</b></p></div>
      <div className={styles.container_time}><p><b>{difference}</b></p></div>
    </div>
  )
}

export default DashBoardNotification
