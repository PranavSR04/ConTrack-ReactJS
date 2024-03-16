import React from 'react'
import HeaderHandler from '../Header/HeaderHandler'
import styles from './FixedFee.module.css'
import OverviewPaymentHandler from '../OverviewPayment/OverviewPaymentHandler'
import MilestonesHandler from '../Milestones/MilestonesHandler'
import MemberCommentsHandler from '../MemberComments/MemberCommentsHandler'
import DocumentsHandler from '../Documents/DocumentsHandler'
import { LocationStateProps } from './types'
import LineChart from '../../RevenueProjection/LineChart'
import RevenueProjectionHandler from '../../RevenueProjection/RevenueProjectionHandler'

const FixedFeeContracts = ({id}:LocationStateProps) => {
  const revenueid=parseInt(id);
  return (
    <div  className={`${styles.maincontainer}`}>
      <HeaderHandler id={id} />
      <OverviewPaymentHandler id={id} />
      <MilestonesHandler id={id} />
      <MemberCommentsHandler id={id} />
      <div className={styles.chart}>
      <RevenueProjectionHandler id={revenueid}/>
      </div>
      <DocumentsHandler id={id} />
    </div>
  )
}

export default FixedFeeContracts
