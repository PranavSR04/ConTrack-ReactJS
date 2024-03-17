import React from 'react'
import DashBoardNotificationHandler from './../DashBoardNotification/DashBoardNotificationHandler';
import { DashBoardNotificationListPropType } from './types';
import styles from '../DashBoardNotification/DashBoardNotification.module.css'
import { Spin } from 'antd';
const DashBoardNotificationList:React.FC<DashBoardNotificationListPropType> = ({notifications, isLoading, isError, error}) => {
  return (
    <div className={styles.containerList}>
      <p>Latest Notifications</p>
      {isLoading &&<Spin/>}
      {isError && <p>No Notification</p>}
      <div className={styles.listStyle}>
        {notifications.map(notification => (
            <DashBoardNotificationHandler key={notification.log_id} notification={notification} />
        ))}
    </div>
    </div>
  )
}

export default DashBoardNotificationList
