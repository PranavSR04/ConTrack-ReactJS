import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from './api/contractStatus';
import { DougnutChartPropsType, apiData } from './types';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';

const DoughnutChart = ({loading, chartData, options}:DougnutChartPropsType) => {
      
  return (
    <>
    <div style={{marginLeft:'15rem',marginTop:'20rem',backgroundColor:'white', width:'14rem',height:'14rem'}}>
    {loading?<div>Loading...</div>:<Doughnut data={chartData} options={options}></Doughnut>}
      </div>
    </>
  )
}

export default DoughnutChart
