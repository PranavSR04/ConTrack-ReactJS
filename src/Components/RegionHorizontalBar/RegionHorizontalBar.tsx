import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from './api/contractStatus';
import { Bar } from 'react-chartjs-2';
import { apiData, data, optionType } from './types';
import { ChartOptions } from 'chart.js';

const RegionHorizontalBar = () => {
    const [regionData, setRegionData] = useState<data>();
    useEffect(() => {
        fetchTopRegionsData();
    }, []);

    const fetchTopRegionsData = async () => {
        try {
            const result = await fetchDataFromApi();
            const datas:data = {
                labels: result.data.map((item:apiData )=> item.region),
                datasets: [{
                    label: 'Contract Count',
                    data: result.data.map((item:apiData) => item.contractCount),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            };
            setRegionData(datas);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const options: ChartOptions<'bar'> = {
        indexAxis: 'y', // Set the index axis to y
        scales: {
          x: {
            position: 'bottom', // Position x-axis at the bottommm
          },
          y: {
            position: 'left', // Position y-axis on the left side
          },
        },
      };

    return (
        <div style={{marginLeft:'15rem',marginTop:'20rem',backgroundColor:'white', width:'20rem',height:'20rem'}}>
            <h6>  Top Contract Sources</h6>
            {regionData&& <Bar data={regionData} options={options} />}
            
        </div>
       
    );
}

export default RegionHorizontalBar
