import React from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { LineChartPropType } from "./types";
import styles from "./RevenueProjection.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
} from "chart.js";
import { Card, Spin } from "antd";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	zoomPlugin,
	Title,
	Tooltip
);

const LineChart = ({ revenueData, loading,error }: LineChartPropType) => {
	const data = {
		labels: revenueData?.map((date) => date.Date),
		datasets: [
			{
				label: "Revenue $",
				data: revenueData?.map((date) => date.Revenue),
				// fill: false,
				borderColor: "rgb(75, 192, 192)",
				pointRadius: 4,
				pointHitRadius: 2,
				pointHoverBackgroundColor: "blue",
				tension: 0.1,
			},
		],
	};

	const options = {
		layout: {
			// padding: {
			// 	top: 11,
			// },
		},
		scales: {
			y: {
				title: {
					display: true,
					text: "Revenue in $",
				},
				ticks: {
					count: 10,
				},
			},
		},

		responsive: true,
	};

	return (
		<div className={styles.body}>
			<div className={styles.large_column}>
				<div className={styles.container}>
					{loading ? (
						<Spin
							className={styles.spinner}
							indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
						/>
					) : revenueData ? (
						<Line data={data} options={options}>
							{" "}
						</Line>
					) : (
						<Card>{error?.error}</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export default LineChart;
