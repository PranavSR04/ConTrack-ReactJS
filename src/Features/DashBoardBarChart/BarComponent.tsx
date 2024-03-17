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
            backgroundColor: '#17a977',
            barPercentage: 0.6,

            
          },
          {
            label: 'FF Counts',
            data: ffcounts,
            backgroundColor: '#177977',
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
              text: 'DU'
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
            max: 10
            
          }
        }
      };
      
  
  return  <div>
  <Bar data={dataset} options={options} />
</div>

}

export default BarComponent
