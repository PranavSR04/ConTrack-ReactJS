import React from 'react'
import ScatterPlot from './ScatterPlot'
import { useEffect, useState } from 'react';
import { getContractRevenue } from './api/getContractRevenue';
import { ContractRevenue } from './types';
import { Scatter } from 'react-chartjs-2';


const ScatterPlotHandler = () => {

    const [scatterData, setScatterData] = useState<Object>({});

    const fetchContractRevenue = async () => {
        try {
            const res = await getContractRevenue();
            const temp: ContractRevenue[] = res.data;
            const scatterData = temp.map(contractRevenue => ({
                x: contractRevenue.duration_months,
                y: contractRevenue.estimated_amount
            }));
            setScatterData(scatterData);
        } catch (err) {
            console.error(err);
        }
    };

    console.log(scatterData)

    // const getMaxX = () => {
    //     if (scatterData.length === 0) return 0;
    //     return Math.max(...scatterData.map(point => point.x));
    // };

    useEffect(() => {
        fetchContractRevenue();
    }, []);

      const data = {
        datasets: [
            {
                label: 'Contract Revenue',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                data: scatterData,
                pointBackgroundColor: 'rgba(50,172,192,71)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 10,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 8,
            }
        ]
    };

  return (
    <ScatterPlot
        fetchContractRevenue={fetchContractRevenue}
        scatterData={scatterData}
        data={data}
    />
  )
}

export default ScatterPlotHandler
