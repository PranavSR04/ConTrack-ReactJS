import { Button, Modal } from "antd";
import React from "react";
import { CloseContractModalPropsType } from "./types";

const CloseContractModal = ({closeContract, visible, onCancel}:CloseContractModalPropsType) => {
  return (
    <>
      <Modal
        title={"Do you wish to close this contract"}
        open={visible}
        onCancel={onCancel}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={closeContract}
            // className={userTableStyles.customButtonYes}
          >
            Yes
          </Button>,
          <Button key="cancel" onClick={onCancel}>
            No
          </Button>,
        ]}
      ></Modal>
    </>
  );
};

export default CloseContractModal;
