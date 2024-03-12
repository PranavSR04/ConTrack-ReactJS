import React from "react";
import { HeadingPropType } from "./types";
import styles from "./Header.module.css";
import { CSVLink } from "react-csv";

const Header = ({
  contractRefId,
  clientName,
  region,
  du,
  contractStatus,
  contractData,
}: HeadingPropType) => {
  return (
    <div className={`${styles.maincontainer__header}`}>
      <div className={`${styles.maincontainer__header__title}`}>
        <div className={`${styles.maincontainer__header__title__contract}`}>
          <h2>
            {clientName} <span>#{contractRefId}</span>
          </h2>
        </div>
        <div className={`${styles.maincontainer__header__title__edit}`}>
          <button
            className={`${styles.maincontainer__header__title__edit__button}`}
          >
            Edit
          </button>
        </div>
        <div className={`${styles.maincontainer__header__title__export}`}>
          {contractData && (
            <button
              className={styles.maincontainer__header__title__export__button}
            >
              <CSVLink filename={`${clientName} .xlsx`} data={contractData} style={{textDecoration:"none", color:"white"}}>
                Export
              </CSVLink>
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.maincontainer__header__subheading}`}>
        <div className={`${styles.maincontainer__header__subheading__box}`}>
          <p>{region}</p>
        </div>
        <div className={`${styles.maincontainer__header__subheading__box}`}>
          <p>{du}</p>
        </div>
        <div className={`${styles.maincontainer__header__subheading__box}`}>
          <p>{contractStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
