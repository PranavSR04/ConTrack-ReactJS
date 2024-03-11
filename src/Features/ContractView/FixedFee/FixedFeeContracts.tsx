import React from 'react'
import HeaderHandler from '../Header/HeaderHandler'
import styles from './FixedFee.module.css'
import OverviewPaymentHandler from '../OverviewPayment/OverviewPaymentHandler'
import MilestonesHandler from '../Milestones/MilestonesHandler'
import MemberCommentsHandler from '../MemberComments/MemberCommentsHandler'
import DocumentsHandler from '../Documents/DocumentsHandler'

const FixedFeeContracts = ({id}:any) => {
  return (
    <div  className={`${styles.maincontainer}`}>
      <HeaderHandler id={id}/>
      <OverviewPaymentHandler id={id}/>
      <MilestonesHandler id={id}/>
      <MemberCommentsHandler id={id}/>
      <DocumentsHandler id={id}/>
    </div>
  )
}

export default FixedFeeContracts
