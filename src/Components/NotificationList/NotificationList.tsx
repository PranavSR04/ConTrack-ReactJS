import React, { useContext, useState } from 'react'
import { NotificationListPropType } from './types';
import NotificationHandler from '../Notification/NotificationHandler';
import styles from '../Notification/Notification.module.css';
import { Drawer,Button } from 'antd';
import NavBar from '../NavBar/NavBar';
import { NavCon } from '../NavContext/NavContext';
const NotificationList:React.FC<NotificationListPropType> = ({notifications, isLoading, isError, error, viewMoreClick, hasViewMore,toggleNotifications}) => {
  const{open,onClose,showDrawer}=useContext(NavCon);

  console.log(open);
  return (
    <>
    <Drawer title="Notifications" onClose={onClose} open={open} className={styles.drawer}>
    {isLoading && <p>Loading...</p>}
    {isError && <p>Error: {error}</p>}
    <div className={styles.listStyle}>
        {notifications.map(notification => (
            <NotificationHandler key={notification.log_id} notification={notification} />
        ))}
       {hasViewMore && (
            <div onClick={viewMoreClick} className={styles.viewMore}>
              View more
            </div>
          )}

    </div>
</Drawer>
</>
  )
}

export default NotificationList;
 