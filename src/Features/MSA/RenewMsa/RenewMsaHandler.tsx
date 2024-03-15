import React from 'react'
import RenewMsa from './RenewMsa'
import { useLocation } from 'react-router';
import { LocationStateProps } from '../EditMsa/types';

const RenewMsaHandler = () => {
  const location = useLocation();
  let { msa_ref_id }= location.state as LocationStateProps
  console.log(msa_ref_id)
  return (
    <div>
      <RenewMsa/>
    </div>
  )
}

export default RenewMsaHandler
