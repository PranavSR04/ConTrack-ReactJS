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
    const dataset = {
        labels: labels,
        datasets: [
          {
            label: 'TM Counts',
            data: tmcounts,
            backgroundColor: 'rgba(111, 0, 0, 0.6)',
            barPercentage: 0.6,
            
          },
          {
            label: 'FF Counts',
            data: ffcounts,
            backgroundColor: 'rgba(220, 0, 0, 0.6)',
            barPercentage: 0.6,
          }
        ],
      };
      const options = {
        scales: {
          x:{
            grid: {
              
            },
          },
          y: {
            grid: {
              display: false, 
            },
            min: 0,
            max: 10
          }
        }
      };
      
  
  return  <div style={{ transform: 'scale(0.5)' }}>
  <Bar data={dataset} options={options} />
</div>

}

export default BarComponent
