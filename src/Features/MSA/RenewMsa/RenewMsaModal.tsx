import React from 'react'
import { Button, Modal } from 'antd'
import { RenewMsaModalPropsType } from './types'

const RenewMsaModal = ({submitRenewMsa, visible, onCancel}:RenewMsaModalPropsType) => {
  return (
    <>
      <Modal
        title={"Are you sure you want to renew this MSA?"}
        open={visible}
        onCancel={onCancel}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={submitRenewMsa}
          >
            Yes
          </Button>,
          <Button key="cancel" onClick={onCancel}>
            No
          </Button>,
        ]}
      ></Modal>
    </>
  )
}

export default RenewMsaModal
