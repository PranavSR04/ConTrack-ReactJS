import React from 'react'
import ContractsCount from '../../Components/DashBoardContractsCount/ContractsCount'
import { Card } from 'antd';
import styles from './dashboard.module.css'
import DashBoardNotificationListHandler from '../../Components/DashBoardNotificationList/DashBoardNotificationListHandler';

const Dashboard = () => {
    const user_id=localStorage.getItem('user_id');
    const userString  = localStorage.getItem('user') as string;
    const userObject = JSON.parse(userString);
    const user_name = userObject?.first_name;   
  return (
    <>
    <div className={styles['dashboard-div1']}>
    <h1 >Hello {user_name}</h1>
    <Card >
      <ContractsCount/>
    </Card>
      <DashBoardNotificationListHandler/>
      </div>
    </>
  )
}

export default Dashboard
