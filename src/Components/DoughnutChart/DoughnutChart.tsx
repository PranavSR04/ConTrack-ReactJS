import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from './api/contractStatus';
import { DougnutChartPropsType, apiData } from './types';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';

const DoughnutChart = ({loading, chartData, options}:DougnutChartPropsType) => {
      
  return (
    <>
    <div style={{ width:'14.4rem',height:'14.4rem'}}>
    {loading?<div>Loading...</div>:<Card><Doughnut data={chartData} options={options}></Doughnut></Card>}
      </div>
    </>
  )
}

export default DoughnutChart
