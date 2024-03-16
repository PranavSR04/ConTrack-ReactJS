import React, { useEffect, useState } from 'react'
import FixedFeeContracts from './FixedFeeContracts'
import NavBarHandler from '../../../Components/NavBar/NavBarHandler'
import SideBar from '../../../Components/SideBar/SideBar'
import { useLocation } from 'react-router-dom'
import { LocationStateProps } from './types'
import { fetchRevenueProjection } from '../../RevenueProjection/api/getRevenueProjection'
import { RevenueProjectionData } from '../../RevenueProjection/types'
import { AxiosError } from 'axios'


const FixedFeeHandler = () => {
  // const [revenueData, setRevenueData] = useState<RevenueProjectionData[]|undefined>([]);
  // const [error,setRevenueError]=useState();
	// const [loading, setLoadingRevenue] = useState(false);
  const location = useLocation();
    const { id }= location.state as LocationStateProps;
    console.log('state id',id)


//     useEffect(()=>{fetchData()},[])

//     const fetchData = async()=>{
//       try{
//     const data = await fetchRevenueProjection(parseInt(id));
//     setLoadingRevenue(true);
//     if (data instanceof AxiosError) {
//       console.log(data.response?.data);
//             setRevenueData(undefined);
//             setRevenueError(data.response?.data);
            
//   } else {
//     const convertedData: RevenueProjectionData[] = Object.entries(
//       data.data
//     ).map(([key, value]) => ({
//       Date: key,
//       Revenue: value,
//     }));
//     console.log(convertedData);
//     setRevenueData(convertedData);
//   }}catch{
//     console.error("Error fetching revenue:", error);
//             console.log(error);
// 		} finally {
// 			setLoadingRevenue(false);
// 		}
  
// }


  return (
    <>
      <FixedFeeContracts id={id} /> 
    </>
  )
}

export default FixedFeeHandler
