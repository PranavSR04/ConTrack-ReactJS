import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { fetchRevenueProjection } from "./api/getRevenueProjection";
import { RevenueProjectionData } from "./types";
import styles from "./RevenueProjection.module.css";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	zoomPlugin,
	Title,
	Tooltip
);

const LineChart = () => {
	const [revenueData, setData] = useState<RevenueProjectionData[]>([]);

	useEffect(() => {
		fetRevenue();
		console.log(data);
	}, []);
	const fetRevenue = async () => {
		const data = await fetchRevenueProjection();
		// setData(data.data);
		console.log(data.data);
		const convertedData: RevenueProjectionData[] = Object.entries(
			data.data
		).map(([key, value]) => ({
			Date: key,
			Revenue: value,
		}));

		console.log(convertedData);
		convertedData && setData(convertedData);
	};

	const data = {
		labels: revenueData.map((date) => date.Date),
		datasets: [
			{
				label: "Revenue",
				data: revenueData.map((date) => date.Revenue),
				// fill: false,
				borderColor: "rgb(75, 192, 192)",
                pointRadius: 4,
                pointHitRadius:2,
                pointHoverBackgroundColor:"blue",
                tension:.1
			},
		],
	};

	
	const options = {
		
		layout: {
			padding: {
				top: 11,
                
			},
		},
        scales: {
            y: {
                ticks:{
                    count:10
                }
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false,
          },
        
		responsive: true,
		
	};

	return (
		<div className={styles.body}>
			<div className={styles.large_column}>
				<div className={styles.container}>
					<Line data={data} options={options}></Line>
				</div>
			</div>
		</div>
	);
};

export default LineChart;
