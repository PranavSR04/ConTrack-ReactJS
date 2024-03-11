import React from 'react'
import styles from './RevenueProjection.module.css'
import { Button } from 'antd'
import { RevenueProjectionPropType } from './types'

const RevenueProjection = ({handleLogout}:RevenueProjectionPropType) => {
  return (
    <div className={styles.revueneProjection}>
        <Button type="primary" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default RevenueProjection
