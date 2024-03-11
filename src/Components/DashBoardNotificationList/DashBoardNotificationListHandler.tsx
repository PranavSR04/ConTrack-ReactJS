import React, { useEffect, useState } from 'react'
import { NotificationType } from '../Notification/types';
import { fetchNotification } from '../NotificationList/Api/getNotifications';
import axios from 'axios';
import DashBoardNotificationList from './DashBoardNotificationList';

const DashBoardNotificationListHandler = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                setError('');
    
                const response = await fetchNotification(1, 5,1); // Assuming one page with 5 items
                if (!('data' in response)) {
                    throw new Error('Invalid response structure');
                }
               
                const { data } = response;
                if (!Array.isArray(data.NotificationListdisplay)) {
                    throw new Error('Notifications data is not an array');
                }
                
    
                setNotifications(data.NotificationListdisplay as NotificationType[]);
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
    }, []);
    
  return (
    <DashBoardNotificationList
    notifications={notifications}
    isLoading={isLoading}
    isError={isError}
    error={error}
/>
  )
}

export default DashBoardNotificationListHandler
