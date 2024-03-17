import React from "react";
import { Card } from "antd";
import styles from "./dashboard.module.css";
import DashBoardNotificationListHandler from "../../Components/DashBoardNotificationList/DashBoardNotificationListHandler";
import ScatterPlotHandler from "../../Components/RevenueScatterPlot/ScatterPlotHandler";
import BarChartHandler from "../DashBoardBarChart/BarChartHandler";
import DashBoardMonthlyRevenueHandler from "../../Components/DashBoardRevenue/DashBoardMonthlyRevenueHandler";
import DashBoardQuaterlyRevenueHandler from "./../../Components/DashBoardRevenue/DashBoardQuaterlyRevenueHandler";
import DashBoardYearlyRevenueHandler from "../../Components/DashBoardRevenue/DashBoardYearlyRevenueHandler";
import TopRevenueHandler from "../../Components/TopRevenueRegion/TopRevenueHandler";
import DashBoardContractCountHandler from "../../Components/DashBoardContractsCount/DashBoardContractCountHandler";
import DashBoardMsaCountHandler from "../../Components/DashBoardContractsCount/DashBoardMsaCountHandler";
import DoughnutChartHandler from "../../Components/DoughnutChart/DoughnutChartHandler";
import RegionHorizontalBar from "../../Components/RegionHorizontalBar/RegionHorizontalBar";
import BreadCrumbs from "../../Components/BreadCrumbs/Breadcrumbs";

const Dashboard = () => {
  const user_id = localStorage.getItem("user_id");
  const userString = localStorage.getItem("user") as string;
  const userObject = JSON.parse(userString);
  const user_name = userObject?.first_name;
  return (
    <>
      <BreadCrumbs style={{ marginLeft: "15rem", marginTop: "1rem" }} />
      <div className={styles["dashboard-div1"]}>
        {/* <h2 className={styles['dashboard-name']}>Hello, <span style={{color:'#DC143C'}}>{user_name}</span> </h2> */}
        {/* <Card >
      <ContractsCount/>
    </Card> */}
    <div className={styles['dash-row1-div']}>
    <div className={styles['dash-revenue-div']}>
    <div className={styles['dash-revenue-div-month']}><DashBoardMonthlyRevenueHandler/></div>
    <div className={styles['dash-revenue-div-month']}><DashBoardQuaterlyRevenueHandler/></div>
    <div className={styles['dash-revenue-div-month']}><DashBoardYearlyRevenueHandler/></div>

    <div className={styles['dash-revenue-div-month']}><DashBoardContractCountHandler/></div>
    <div className={styles['dash-revenue-div-month']}><DashBoardMsaCountHandler/></div>
    </div>
    <div className={styles['dash-revenue-div-notifi']}><DashBoardNotificationListHandler/></div>
    </div>

    <div className={styles['dash-row1-charts']}>
    <div className={styles['dash-row1-barchart']}>
      <Card className={styles['dash-row2-ducharts']}><BarChartHandler/> </Card>  
      </div> 
      <div className={styles['dash-row1-doughnut']}>     
      <DoughnutChartHandler />
      </div> 
    </div>
    
<div  className={styles['dash-row2-charts']}>
  <Card style={{backgroundColor:'white',marginRight:'1rem'}}>      
    <ScatterPlotHandler/>
      </Card> 
 <Card style={{backgroundColor:'white',marginRight:'1rem'}}>
 <RegionHorizontalBar/>
 </Card>
 <Card style={{backgroundColor:'white', }}>
 <TopRevenueHandler/>
 </Card>
</div>
      </div>
    </>
  );
};

export default Dashboard;
