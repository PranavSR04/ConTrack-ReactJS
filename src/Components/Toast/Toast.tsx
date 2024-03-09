import React from 'react';
import { Button, notification, Space } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Toast: React.FC = () => {
  let actionMessage="user deleted successfully";
  let messageType='success';

  const [noti, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    noti[type]({
      message: 'Notification Title',
      description:
        'This is the toaster message.',
    });
    switch(messageType){
      case 'success':
        openNotificationWithIcon('success');
        console.log('success');
        break;
      case 'fail':
        console.log('f');
        break;
      case 'notifi':
        console.log('N');
        break;
    }
  };

  return (
    <>
      {contextHolder}
      <Space>
        
        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        <br /><br /><br />
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </Space>
    </>
  );
};

export default Toast;