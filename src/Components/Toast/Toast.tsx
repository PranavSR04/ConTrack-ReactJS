import React from 'react';
import { Button, notification, Space } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Toast: React.FC = () => {
  const [noti, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    noti[type]({
      message: 'Notification Title',
      description:
        'This is the toaster message.',
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </Space>
    </>
  );
};

export default Toast;