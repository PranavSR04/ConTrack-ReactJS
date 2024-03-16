import { Button } from "antd";
import React from "react";
import CloseContractModal from "./CloseContractModal";
import styles from './CloseContract.module.css'
import { CloseContractPropType } from "./types";

const CloseContract = ({
    visible,
    onCancel,
    closeContract,
    modalPopUp,
    contractStatus}: CloseContractPropType) => {
  return (
    <>
      <div className={`${styles.maincontainer__documents__buttons}`}>
        {contractStatus !== "Closed" && (
          <Button
            type="primary"
            style={{
              marginBottom: "2rem",
              backgroundColor: "red",
              marginLeft: "auto",
              marginRight: "4rem",
              fontSize:"small"
            }}
            onClick={modalPopUp}
          >
            Close Contract
          </Button>
        )}
      </div>
      <CloseContractModal
        visible={visible}
        closeContract={closeContract}
        onCancel={onCancel}
      />
    </>
  );
};

export default CloseContract;
