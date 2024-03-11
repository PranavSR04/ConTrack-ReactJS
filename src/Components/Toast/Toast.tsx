import React, { useEffect } from 'react';
import { Button, notification, Space } from 'antd';
import { ToastProps } from '.';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Toast = ( {message,messageType}:ToastProps) => {

  const [noti, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message:string) => {
    noti[type]({
      message: message,
      // description:
      //   'This is the sub message.',
      placement: 'bottomRight',
      // style: { backgroundColor: 'crimson' }
    });
  };
  
  useEffect(() => {
    const dynamicMessage = message;
    const dynamicType = messageType;
    openNotificationWithIcon(dynamicType, dynamicMessage);

  }, []); 

  return (
    <>
      {contextHolder}

    </>
  );
};

export default Toast;