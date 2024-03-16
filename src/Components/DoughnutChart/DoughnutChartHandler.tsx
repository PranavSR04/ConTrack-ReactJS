import React, { useEffect, useState } from 'react'
import { apiData } from './types';
import { fetchDataFromApi } from './api/contractStatus';
import DoughnutChart from './DoughnutChart';

const DoughnutChartHandler = () => {
    const [apiData,setApiData]=useState<apiData>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        fetchData();
      }, [ ]);      
      const fetchData=async()=>{
        try {
            // setLoading(true);
            const result = await fetchDataFromApi();
            setApiData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
          };
          const chartData = {
            labels: ['Active', 'Progress', 'Expiring', 'Closed', 'Expired'],
            datasets: [
              {
                data: [
                    apiData?.active || 0,
                    apiData?.progress || 0,
                    apiData?.expiring || 0,
                    apiData?.closed || 0,
                    apiData?.Expired || 0,
                ],
                backgroundColor: [
                  '#4CAF50', // Active
                  '#36A2EB', // Progress
                  '#FFCE56', // Expiring
                  '#FF6384', // Closed
                  '#FF0000', // Expired
                ],
              },
            ],
          };

          const options = {
            responsive: true,
            legend: {
                labels: {
                    borderColor: 'rgba(75,192,192,1)',
                    fontColor: 'red', // Change font color of legend labels
                    fontSize: 24, // Change font size of legend labels
                    fontStyle: 'italic', // Change font style of legend labels
                },
            },
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

export default DoughnutChartHandler
