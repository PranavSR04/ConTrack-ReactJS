import React, { useContext, useEffect, useState } from 'react'
import { NotificationType } from '../Notification/types';
import NotificationList from './NotificationList';
import axios from 'axios';
import { fetchNotification } from './Api/getNotifications';
import NavBar from '../NavBar/NavBar';
import { NavContexts } from '../NavContext/NavContext';

const NotificationListHandler = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [hasViewMore, setHasViewMore] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const{setActiveNotificationCount,activeNotificationCount}=useContext(NavContexts);

    const toggleNotifications = () => {
        setShowDrawer(prevState => !prevState);
    };
    useEffect(() => {
        //For fetching notifications 
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                setError('');
                const SENDTO_ID = parseInt(localStorage.getItem("user_id") || '0', 10);
                console.log("user id from local",SENDTO_ID)
                const response = await fetchNotification(page, 10,SENDTO_ID);//fetch the notification for a particular user
                if (!('data' in response)) {
                    throw new Error('Invalid response structure');
                }
               
                const { data } = response;
                if (!Array.isArray(data.NotificationListdisplay)) {
                    throw new Error('Notifications data is not an array');
                }
                const activenotification=data.active_notifications_count;
                setActiveNotificationCount(activenotification)
                if (page === 1) {//if the page is 1 then load the notification
                    setNotifications(data.NotificationListdisplay as NotificationType[]);
                } else {
                    setNotifications((prev: NotificationType[] | undefined) => {
                        if (prev) {//if there is more notifications append to previous notification
                            let newNotifs = data.NotificationListdisplay as NotificationType[];
                            return [...prev, ...newNotifs];
                        } else {
                            return [...data.NotificationListdisplay as NotificationType[]];
                        }
                    });
                }
                if (data.NotificationListdisplay.length < 10) {
                    setHasViewMore(false);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error fetching notifications:', error.message);
                    setError(error.message || 'An error occurred with the request.');
                } else if (error instanceof Error) {
                    console.error('Error fetching notifications:', error.message);
                    setError(error.message);
                } else {
                    console.error('Unknown error:', error);
                    setError('An unknown error occurred.');
                }
                setIsError(true);
                
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    },[page]);

    const viewMoreClick = () => {
        setPage(prevPage => prevPage + 1);
    };
  return (
    <>
  <NotificationList
    notifications={notifications}
    isLoading={isLoading}
    isError={isError}
    error={error}
    viewMoreClick={viewMoreClick}
    hasViewMore={hasViewMore}
    toggleNotifications={toggleNotifications}
/>
</>

    
  )
}

export default NotificationListHandler
