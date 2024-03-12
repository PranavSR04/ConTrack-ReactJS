import { Select } from 'antd'
import React, { useState } from 'react';
import styles from './ContractsCount.module.css';

const ContractsCount = () => {
    const [contractCount, setContractCount]=useState(12)
  return (
    <>
    <div className={styles['dashboard-contractCount-div']}>
    <h5 className={styles['dashboard-contractCount-head']}>Total Contracts</h5>
    <Select className={styles['dashboard-contractCount-select']}
          style={{ width: 200 }}
          options={[]}
          placeholder='Active'
          //onSelect={(value) => setSelectedStatus(value as string)}
        />
        </div>
      <div className={styles['dashboard-contractCount']}>{contractCount}</div>
    </>
  )
}

export default ContractsCount
