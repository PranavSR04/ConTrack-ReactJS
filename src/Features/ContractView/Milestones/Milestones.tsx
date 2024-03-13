import React from "react";
import { MileStonePropType } from "./types";
import { Card } from "antd";
import { LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import { Milestone } from "../FixedFee/types";
import MilestoneCard from "./MilestoneCard";
import styles from "./Milestones.module.css";

const Milestones = ({
  milestones,
  loading,
  visibleRange,
  moveCards,
}: MileStonePropType) => {
  return (
    <>
      <Card className={`${styles.maincontainer__milestones}`} loading={loading}>
        <div className={`${styles.maincontainer__milestones__title}`}>
          <h2>Milestones</h2>
        </div>
        <div className={`${styles.maincontainer__milestones__body}`}>
          {visibleRange.start > 0 && (
            <div className={`${styles.maincontainer__milestones__body__left}`}>
              <LeftCircleTwoTone style={{color:"#dc143c"}} onClick={() => moveCards("left")} />
            </div>
          )}
          <div className={`${styles.maincontainer__milestones__body__card}`}>
            {milestones
              .slice(visibleRange.start, visibleRange.end)
              .map((milestone: Milestone) => (
                <MilestoneCard
                  key={milestone.id}
                  milestoneId={milestone.id}
                  milestoneDesc={milestone.milestone_desc}
                  milestoneAmount={milestone.amount}
                  milestoneEndDate={milestone.milestone_enddate}
                  milestonePercentage={milestone.percentage}
                />
              ))}
          </div>
          {visibleRange.end < milestones.length && (
            <div className={`${styles.maincontainer__milestones__body__right}`}>
              <RightCircleTwoTone style={{color:"#dc143c"}} onClick={()=>moveCards("right")} />
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default Milestones;
