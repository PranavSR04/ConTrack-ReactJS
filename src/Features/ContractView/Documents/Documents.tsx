import { Button, Card } from "antd";
import React from "react";
import { DocumentsPropType } from "./types";
import styles from "./Documents.module.css";
import { FilePdfFilled } from "@ant-design/icons";
import CloseContractModal from "./CloseContractModal";

const Documents = ({
  contractDocuments,
  contractRefId,
  clientName,
  loading,
  addendums,
  visible,
  onCancel,
  closeContract,
  modalPopUp,
  contractStatus,
}: DocumentsPropType) => {
  console.log("contact status", contractStatus);
  return (
    <>
      <Card className={`${styles.maincontainer__documents}`} loading={loading}>
        <div className={`${styles.maincontainer__documents__title}`}>
          <h2>Documents</h2>
        </div>
        <div className={`${styles.maincontainer__documents__body}`}>
          <div className={`${styles.maincontainer__documents__body__contract}`}>
            <FilePdfFilled style={{ fontSize: "2rem", color: "#dc143c" }} />
            <a href={contractDocuments} target="_blank">
              {contractRefId} {clientName} Contract
            </a>
          </div>
          {addendums?.map((addendum, index) => (
            <div
              key={addendum.id}
              className={styles.maincontainer__documents__body__contract}
            >
              <FilePdfFilled style={{ fontSize: "2rem", color: "#dc143c" }} />
              <a
                className={styles.addendumLink}
                href={addendum.addendum_doclink || "#"}
                target="_blank"
              >
                Addendum {index + 1}
              </a>
            </div>
          ))}
        </div>
      </Card>
      <div className={`${styles.maincontainer__documents__buttons}`}>
        {contractStatus !== "Closed" && (
          <Button
            type="primary"
            style={{
              marginBottom: "2rem",
              backgroundColor: "red",
              marginLeft: "auto",
              marginRight: "4rem",
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

export default Documents;
