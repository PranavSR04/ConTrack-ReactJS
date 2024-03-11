// import { Card, Space } from "antd";
import { Avatar, Card, Skeleton, Switch } from 'antd';
import React from "react";
import { OverviewPropType } from "./types";
import styles from './OverviewPayment.module.css'

const OverviewPayment = ({dateOfSignature, startDate, endDate, contractType, estimatedAmount, loading}: OverviewPropType) => {
  return (
    <div className={`${styles.maincontainer__overviewpayment}`}>
      <Card className={`${styles.maincontainer__overviewpayment__overview}`} loading={loading}>
        <div className={`${styles.maincontainer__overviewpayment__title}`}>
          <h4>Basic Overview</h4>
        </div>
        <div className={`${styles.maincontainer__overviewpayment__content}`}>
            <div className={`${styles.maincontainer__overviewpayment__content__list}`}>
                <h5>Date of Signature</h5>
                <h5 className={`${styles.maincontainer__overviewpayment__content__list__value}`}>{dateOfSignature}</h5>
            </div>
            <div className={`${styles.maincontainer__overviewpayment__content__list}`}>
                <h5>Start Date</h5>
                <h5 className={`${styles.maincontainer__overviewpayment__content__list__value}`}>{startDate}</h5>
            </div>
            <div className={`${styles.maincontainer__overviewpayment__content__list}`}>
                <h5>End Date</h5>
                <h5 className={`${styles.maincontainer__overviewpayment__content__list__value}`}>{endDate}</h5>
            </div>
            <div className={`${styles.maincontainer__overviewpayment__content__list}`}>
                <h5>Contract Type</h5>
                <h5 className={`${styles.maincontainer__overviewpayment__content__list__value}`}>{contractType==="FF"?"Fixed Fee":(contractType==="TM"?"Time and Material":"")}</h5>
            </div>
        </div>
      </Card>
      <Card className={`${styles.maincontainer__overviewpayment__payment}`} loading={loading}>
        <div className={`${styles.maincontainer__overviewpayment__title}`}>
          <h4>Estimated Reveue</h4>
        </div>
        <div className={`${styles.maincontainer__overviewpayment__revenue}`}>
            <h4>$ {estimatedAmount}</h4>
        </div>
      </Card>
    </div>
  );
};

export default OverviewPayment;
