import React from "react";
import ContractsCount from "../../Components/DashBoardContractsCount/ContractsCount";
import { Card } from "antd";
import styles from "./dashboard.module.css";
import DashBoardNotificationListHandler from "../../Components/DashBoardNotificationList/DashBoardNotificationListHandler";
import ScatterPlotHandler from "../../Components/RevenueScatterPlot/ScatterPlotHandler";
import DoughnutChartHandler from "../../Components/DoughnutChart/DoughnutChartHandler";
import RegionHorizontalBar from "../../Components/RegionHorizontalBar/RegionHorizontalBar";

const Dashboard = () => {
  const user_id = localStorage.getItem("user_id");
  const userString = localStorage.getItem("user") as string;
  const userObject = JSON.parse(userString);
  const user_name = userObject?.first_name;
  return (
    <>
      <div className={styles["dashboard-div1"]}>
        <h2 className={styles["dashboard-name"]}>
          Hello, <span style={{ color: "#DC143C" }}>{user_name}</span>{" "}
        </h2>
        <Card>
          <ContractsCount />
        </Card>
        <DashBoardNotificationListHandler />
      </div>
      <DoughnutChartHandler />
      <RegionHorizontalBar />

      <Card
        style={{
          marginLeft: "15rem",
          marginTop: "20rem",
          backgroundColor: "white",
        }}
      >
        <ScatterPlotHandler />
      </Card>
    </>
  );
};

export default Dashboard;
