import React from "react";
import { HeadingPropType } from "./types";
import styles from "./Header.module.css";

const Header = ({
  contractRefId,
  clientName,
  region,
  du,
  contractStatus,
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
          <button
            className={`${styles.maincontainer__header__title__export__button}`}
          >
            Export
          </button>
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
