import React, { useEffect } from 'react';
import { Button, notification, Space } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Toast = () => {
  let actionMessage="user deleted successfully";
  let messageType='success';

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
    const dynamicMessage = 'User deleted successfully';
    const dynamicType = 'success';
    openNotificationWithIcon(dynamicType, dynamicMessage);

  }, []); 

  return (
    <>
      {contextHolder}

    </>
  );
};

export default Toast;