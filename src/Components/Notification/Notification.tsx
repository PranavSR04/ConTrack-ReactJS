import React from 'react'
import { NotificationType } from './types';
import styles from './Notification.module.css'
interface NotificationProps {
    notification: NotificationType;
    difference: string;
}
const Notification:React.FC<NotificationProps> = ({notification,difference}) => {
    let actionStyle = '';

    if (notification.action === 'Added') {
        actionStyle = styles.added;
    } else if (notification.action === 'Edited') {
        actionStyle = styles.edited;
    } else if (notification.action === 'Expiring') {
        actionStyle = styles.expiring;
    } else if (notification.action === 'Expired') {
        actionStyle = styles.expired;
    } else if (notification.action === 'Renewed') {
        actionStyle = styles.renewed;
    }
    console.log(notification.client_name)
  return (
    <div className={styles.cardStyle}>
            <div className={actionStyle}>
                <p>{notification.action}</p>
            </div>
            <div className={styles.cardStyle_right}>
                <b>{notification.contract_id ? `${notification.contract_id}: Contract ${notification.action} for ${notification.client_name}` : `${notification.msa_id}: Msa ${notification.action} for ${notification.client_name}`}</b>
            </div>
            <div className={styles.difference}>
                <p><b>{difference}</b></p>
            </div>
    </div>
  )
}

export default Notification
