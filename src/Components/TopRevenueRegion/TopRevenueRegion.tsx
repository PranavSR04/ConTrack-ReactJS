import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTopRevenueRegion } from './api/getTopRevenueRegion';
import { topRevenueRegionType } from './type';
import { TopRevenueRegionHandlerPropType } from './type';

const TopRevenueRegion = ({fetchTopRevenueRegions,barChartData,data}:TopRevenueRegionHandlerPropType) => {
  return (

    <div style={{height: '400px', width: '600px', transform:'scale(0.7)'}}>
     <Bar
            data={data}
            options={{
                indexAxis: 'y',
                scales: {
                    x:{
                        title: {
                            display: true,
                            text: 'Revenue (USD)' 
                        },
                     ticks: {
                             callback: function(value) {
                            const numericValue = Number(value);
                            return (numericValue / 1000) + 'k';
                                }
                            },
                     grid: {
                             display: false // Disable grid lines on the x-axis
                            }
                    },
                    y: {
                       
                        beginAtZero: true,
                        grid: {
                            display: false // Disable grid lines on the x-axis
                        }
                    },
                },
                plugins: {
                    legend: {
                        display: false // Hide the legend
                    }
                }
            }}
        />
    </div>
  )
}

export default TopRevenueRegion
