import React, { useEffect, useState } from 'react'
import { fetchDuCount } from './api/getDuCount'
import BarComponent from './BarComponent';
import { BarChartPropType } from './types/index';
const BarChartHandler = () => {
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<{du: string; TM: number;  FF: number}[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(()=>{
        const fetchCount=async()=>{
            try{
                setError('');
                setIsError(false);
                const response=await fetchDuCount();
                console.log(response[0]);
                setData(response[0]);

                if (!('data' in response)) {  
                    throw new Error('Invalid response structure');
                }
            }catch{
                setIsError(true);
                setError('An error occurred with the request.');
            }
        };
        fetchCount();
    },[]);
  return (
    <div>
      <BarComponent data={data}/>
    </div>
  )
}

export default BarChartHandler
