import React, { useContext, useState } from 'react'
import { NotificationListPropType } from './types';
import NotificationHandler from '../Notification/NotificationHandler';
import styles from '../Notification/Notification.module.css';
import { Drawer, Spin } from 'antd';
import { NavCon } from '../NavContext/NavContext';
import { LoadingOutlined } from "@ant-design/icons";

const NotificationList = ({notifications, isLoading, isError, error, viewMoreClick, hasViewMore,toggleNotifications}:NotificationListPropType) => {
  const{open,onClose,showDrawer}=useContext(NavCon);

  console.log(open);
  return (
    <>
    <Drawer title="Notifications" onClose={onClose} open={open} className={styles.drawer}>
    {/* {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />}/>} */}
    {isError && <p>No Notification</p>}
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
 