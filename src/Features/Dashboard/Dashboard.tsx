import React from 'react'
import ContractsCount from '../../Components/DashBoardContractsCount/ContractsCount'
import { Card } from 'antd';
import styles from './dashboard.module.css'
import DashBoardNotificationListHandler from '../../Components/DashBoardNotificationList/DashBoardNotificationListHandler';

const Dashboard = () => {
  return (
    <>
    <div className={styles['dashboard-div1']}>
    <h1 >Hello User</h1>
    <Card >
      <ContractsCount/>
    </Card>
      <DashBoardNotificationListHandler/>
      </div>
    </>
  )
}

export default Dashboard
