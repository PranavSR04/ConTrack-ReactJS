import React from 'react'
import { Card } from 'antd';
import styles from './dashboard.module.css'
import DashBoardNotificationListHandler from '../../Components/DashBoardNotificationList/DashBoardNotificationListHandler';
import ScatterPlotHandler from '../../Components/RevenueScatterPlot/ScatterPlotHandler';
import BarChartHandler from '../DashBoardBarChart/BarChartHandler';
import DashBoardMonthlyRevenueHandler from '../../Components/DashBoardRevenue/DashBoardMonthlyRevenueHandler';
import DashBoardQuaterlyRevenueHandler from './../../Components/DashBoardRevenue/DashBoardQuaterlyRevenueHandler';
import DashBoardYearlyRevenueHandler from '../../Components/DashBoardRevenue/DashBoardYearlyRevenueHandler';

import TopRevenueHandler from '../../Components/TopRevenueRegion/TopRevenueHandler';
import DashBoardContractCountHandler from '../../Components/DashBoardContractsCount/DashBoardContractCountHandler';
import DashBoardMsaCountHandler from '../../Components/DashBoardContractsCount/DashBoardMsaCountHandler';

const Dashboard = () => {
  const user_id = localStorage.getItem("user_id");
  const userString = localStorage.getItem("user") as string;
  const userObject = JSON.parse(userString);
  const user_name = userObject?.first_name;
  return (
    <>
    <div className={styles['dashboard-div1']}>
    {/* <h2 className={styles['dashboard-name']}>Hello, <span style={{color:'#DC143C'}}>{user_name}</span> </h2> */}
    {/* <Card >
      <ContractsCount/>
    </Card> */}
    <div style={{display:'flex'}}>
        <DashBoardMonthlyRevenueHandler/>
        <DashBoardQuaterlyRevenueHandler/>
        <DashBoardYearlyRevenueHandler/>
        <DashBoardContractCountHandler/>
        <DashBoardMsaCountHandler/>
      <div style={{flex:1}}>
        <DashBoardNotificationListHandler/>
      </div>
    
   
    </div>
   
    
    </div>
    <Card style={{ marginLeft: '6rem', width: '25rem', backgroundColor: 'rgba(75,192,255,0.1)', border: '1px solid teal' }}>      
    <ScatterPlotHandler/>
      </Card> 
      {/* <Card style={{width:'25rem', marginLeft:'15rem',marginBottom:'20rem',marginTop:'20rem',backgroundColor:'#000000'}}>
      <BarChartHandler/>  
      </Card> */}
      <Card style={{marginLeft:'15rem',marginTop:'20rem',backgroundColor:'white'}}>
      <TopRevenueHandler/>
      </Card>

      

    </>
  );
};

export default Dashboard;
