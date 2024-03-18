import React from 'react'
import { BarChartPropType } from './types'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const BarComponent = ({data}:BarChartPropType) => {
    console.log(data);
    const labels = data.map(item => item.du);
    const tmcounts = data.map(item => item.TM);
    const ffcounts = data.map(item => item.FF);
    const tmMax = Math.max(...tmcounts);
    const ffMax = Math.max(...ffcounts);
    const maxDataValue = Math.max(tmMax, ffMax);

    
    const dataset = {
        labels: labels,
        
        datasets: [
          {
            label: 'TM Counts',
            data: tmcounts,
            backgroundColor: '#1C4E80',
            barPercentage: 0.6,

            
          },
          {
            label: 'FF Counts',
            data: ffcounts,
            backgroundColor: '#0091D5',
            barPercentage: 0.6,
          }
        ],
      };
      const options = {
        scales: {
          x:{
            grid: {

              
            },
            title: {
              display: true,
              text: ' '
          }},
          y: {
            grid: {
              display:false
              
            },
            title: {
              display: true,
              text: 'Contract Count'
          },
            min: 0,
            max: Math.ceil(maxDataValue * 1.1)
            
          },
        }
        
      };
      
  
  return  <>
  <Bar data={dataset} options={options} />
</>

}

export default BarComponent
