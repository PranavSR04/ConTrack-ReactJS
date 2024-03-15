import React from 'react'
import ContractsCount from '../../Components/DashBoardContractsCount/ContractsCount'
import { Card } from 'antd';
import styles from './dashboard.module.css'
import DashBoardNotificationListHandler from '../../Components/DashBoardNotificationList/DashBoardNotificationListHandler';
import BarChartHandler from '../DashBoardBarChart/BarChartHandler';

const Dashboard = () => {
    const user_id=localStorage.getItem('user_id');
    const userString  = localStorage.getItem('user') as string;
    const userObject = JSON.parse(userString);
    const user_name = userObject?.first_name;   
  return (
    <>
    <div className={styles['dashboard-div1']}>
    <h2 className={styles['dashboard-name']}>Hello, <span style={{color:'#DC143C'}}>{user_name}</span> </h2>
    <Card >
      <ContractsCount/>
    </Card>
    <BarChartHandler/>   
      <DashBoardNotificationListHandler/>
      </div>
    </>
  )
}

export default Dashboard
