import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTopRevenueRegion } from './api/getTopRevenueRegion';
import { topRevenueRegionType } from './type';
import TopRevenueRegion from './TopRevenueRegion';

const TopRevenueHandler = () => {

    const [barChartData, setBarChartData] = useState<topRevenueRegionType[]>([]);

    const fetchTopRevenueRegions = async () => {
        try {
            const res = await getTopRevenueRegion();
            const data = res.data.map((item: { region: string; total_amount: number; }) => ({
                region: item.region,
                revenue: item.total_amount
            }));

            setBarChartData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTopRevenueRegions();
    }, []);

    const data = {
        labels: barChartData.map((item: { region: string; }) => item.region),
        datasets: [
            {
                label: 'Revenue by Region',
                data: barChartData.map((item: { revenue: number; }) => item.revenue),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (

       <TopRevenueRegion
       fetchTopRevenueRegions={fetchTopRevenueRegions}
       barChartData={barChartData}
       data={data}
       />

    );
}

export default TopRevenueHandler;
