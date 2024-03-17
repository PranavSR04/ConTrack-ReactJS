import React, { useEffect, useState } from 'react';
import { fetchDataFromApi } from './api/contractStatus';
import DoughnutChart from './DoughnutChart';
import { apiData } from './types';

const DoughnutChartHandler = () => {
    const [contractData, setContractData] = useState<apiData>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await fetchDataFromApi();
            setContractData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: ['Active', 'Progress', 'Expiring'],
        datasets: [
            {
                data: [
                    contractData?.active || 0,
                    contractData?.progress || 0,
                    contractData?.expiring || 0,
                ],
                backgroundColor: [
                    '#80EE90', // Active
                    '#36A2EB', // Progress
                    '#FFA500', // Expiring
                ],
            },
        ],
    };

    const options = {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 11  // Font size
            },
            boxWidth: 12  // Color block width
          }
        }
      }
    };  
  return (
    <>
      <DoughnutChart
      chartData={chartData}
      loading={loading}
      options={options} />
    </>
  )
}

export default DoughnutChartHandler;
