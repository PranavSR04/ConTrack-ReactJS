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
  const location = useLocation();
    const { id }= location.state as LocationStateProps;
    console.log('state id',id)

  return (
    <div>
      <FixedFeeContracts id={id}/> 
    </div>
  )
}

export default FixedFeeHandler
