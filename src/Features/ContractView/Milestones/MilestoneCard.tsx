import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { MilestoneCardPropType } from "./types";
import styles from "./Milestones.module.css";

const MilestoneCard = ({
  milestoneId,
  milestoneDesc,
  milestoneAmount,
  milestonePercentage,
  milestoneEndDate,
}: MilestoneCardPropType) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [convertedEndDate, setConvertedEndDate] = useState<string>("")

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    // Converting milestoneEndDate to a Date object for comparison
    const expectedCompletionDate: Date = new Date(milestoneEndDate);

    // Check if the current date is after the expected completion date
    const isDateReached = new Date() >= expectedCompletionDate;

    if (isDateReached) {
      setIsCompleted(true);
    }

    // Converting "yyyy-mm-dd" into "dd-mm-yyyy" format
    let newDate = milestoneEndDate;
    let parts = newDate.split("-");
    let formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    setConvertedEndDate(formattedDate);
  }, []);

  return (
    <div>
      <Card
        key={milestoneId}
        className={`${styles.maincontainer__milestones__body__card__individual} 
        ${
          isCompleted
            ? styles.maincontainer__milestones__card__complete
            : styles.maincontainer__milestones__card__incomplete
        }`}
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => handleMouseLeave()}
      >
        <div
          className={`${styles.maincontainer__milestones__body__card__individual__desc}`}
        >
          <h4>{milestoneDesc}</h4>
        </div>
        {isHovered && (
          <div
            className={`${styles.maincontainer__milestone__body__card__individual__popup} `}
          >
            {/* <div
              className={`${styles.maincontainer__milestone__body__card__individual__popup__data}`}
            >
              <h3>Payment Percentage</h3>
              <p>{milestonePercentage}%</p>
            </div> */}
            <div
              className={`${styles.maincontainer__milestone__body__card__individual__popup__data}`}
            >
              <h3>Milestone Revenue</h3>
              <p>$ {milestoneAmount}</p>
            </div>
            <div
              className={`${styles.maincontainer__milestone__body__card__individual__popup__data}`}
            >
              <h3>Expected Completion Date</h3>
              <p>{convertedEndDate}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MilestoneCard;
