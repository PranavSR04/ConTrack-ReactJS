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

const LineChart = ({ revenueData, loading, error }: LineChartPropType) => {
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
			padding: {
				left: 90, // Increase the left padding to create space
			},
			margin: {
				left: 90,
			},
		},
		scales: {
			x: {
				ticks: {
					stepSize: 9, // Increase the step size to create more space between points
               		 count: 200,
						
				  }
				}
			  ,
			y: {
				title: {
					display: true,
					text: "Revenue in $",
				},
				ticks: {
					count: 10,
					beginAtZero: true,
					callback: function (value: any) {
						if (value >= 1000000) {
							return (value / 1000000).toFixed(2) + 'M';
						} else if (value >= 1000) {
							return (value / 1000).toFixed(2) + 'K';
						} else {
							return value.toFixed(2);
						}
					},
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
