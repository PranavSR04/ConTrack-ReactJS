import React, { useState } from 'react'

const ContractsCount = () => {
    const [contractCount, setContractCount]=useState(10)
  return (
    <>
    <h3>Total Contracts</h3>
      {contractCount}
    </>
  )
}

export default ContractsCount
