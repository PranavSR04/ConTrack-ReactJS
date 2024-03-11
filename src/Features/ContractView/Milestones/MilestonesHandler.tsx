import React, { useEffect, useState } from "react";
import Milestones from "./Milestones";
import { getContractData } from "../FixedFee/api/getContractData";
import { Milestone } from "../FixedFee/types";
import { MilestonesHandlerType } from "./types";

const MilestonesHandler = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cardsPerPage: number = 2;
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 2 }); // Initial Cards to be displayed

  useEffect(() => {
    let responses;
    const fetchData = async () => {
      try {
        responses = await getContractData();
        // console.log(responses);
        getContractMilestones(responses);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  const getContractMilestones: MilestonesHandlerType["getContractMilestones"] =
    (responses) => {
      if (responses && responses.data && responses.data.length > 0) {
        console.log("milestone: ", responses.data[0].milestones);
        setMilestones(responses.data[0].milestones);
      }
    };

  const moveCards = (direction: string) => {
    const cardStep: number = 1; // Number of cards to move on each click
    const totalCards: number = milestones.length;
    let newStart, newEnd;

    if (direction === "left") {
      newStart = Math.max(0, visibleRange.start - cardStep);
      newEnd = newStart + cardsPerPage;
    } else {
      newEnd = Math.min(totalCards, visibleRange.end + cardStep);
      newStart = newEnd - cardsPerPage;
    }

    setVisibleRange({ start: newStart, end: newEnd });
  };

  return (
    <>
      <Milestones
        milestones={milestones}
        loading={loading}
        visibleRange={visibleRange}
        moveCards={moveCards}
      />
    </>
  );
};

export default MilestonesHandler;
