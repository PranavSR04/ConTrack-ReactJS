import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
// import { DataItem, Props } from './types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ContractRevenue } from './types';
import axiosInstance from '../../Config/AxiosConfig';
// import {  LinearScale, DeepPartial } from 'chart.js';
// import { ScatterDataPoint} from "chart.js"
import 'chart.js/auto'
import { getContractRevenue } from './api/getContractRevenue';
import { ScatterPlotHandlerPropType } from './types';


const ScatterPlot = ({fetchContractRevenue,scatterData,data}:ScatterPlotHandlerPropType) => {



    return(
        <div style={{height: '400px', width: '600px'}}>
            <Scatter
                data={data}
                options={{
                    scales: {
                        x: {
                            beginAtZero: true,
                           }
                    }
                }}
            
            />
        </div>
    );
}

export default ScatterPlot;