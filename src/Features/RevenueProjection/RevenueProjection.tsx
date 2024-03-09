import React from 'react'
import styles from './RevenueProjection.module.css'
import { Button } from 'antd'
import { RevenueProjectionPropType } from './types'
import DemoLine from './DemoLine'
import LineChart from './LineChart'


const RevenueProjection = ({handleLogout,fetRevenue}:RevenueProjectionPropType) => {
  return (
    <div className={styles.revueneProjection}>
        <Button type="primary" onClick={handleLogout}>Logout</Button>
        <Button type="primary" onClick={fetRevenue}>Revnue</Button>

        <div >
          <LineChart/>
          <DemoLine/>
            

        </div>
    </div>
  )
}

export default RevenueProjection
