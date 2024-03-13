import React from 'react'
import FixedFeeContracts from './FixedFeeContracts'
import NavBarHandler from '../../../Components/NavBar/NavBarHandler'
import SideBar from '../../../Components/SideBar/SideBar'
import { useLocation } from 'react-router-dom'
import { LocationStateProps } from './types'


const FixedFeeHandler = () => {
  const location = useLocation();
    let { id }= location.state as LocationStateProps;
    console.log('state id',id)
  return (
    <>
      <FixedFeeContracts id={id}/> 
    </>
  )
}

export default FixedFeeHandler
