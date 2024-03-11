import React from 'react'
import HeaderHandler from '../Header/HeaderHandler'
import styles from './FixedFee.module.css'
import OverviewPaymentHandler from '../OverviewPayment/OverviewPaymentHandler'
import MilestonesHandler from '../Milestones/MilestonesHandler'
import MemberCommentsHandler from '../MemberComments/MemberCommentsHandler'
import DocumentsHandler from '../Documents/DocumentsHandler'

const FixedFeeContracts = () => {
  return (
    <div  className={`${styles.maincontainer}`}>
      <HeaderHandler />
      <OverviewPaymentHandler/>
      <MilestonesHandler/>
      <MemberCommentsHandler/>
      <DocumentsHandler/>
    </div>
  )
}

export default FixedFeeContracts
