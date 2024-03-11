import { AxiosError } from "axios";
import { ContractApiType, Milestone } from "../../FixedFee/types";

export interface MilestonesHandlerType{
    responses: ContractApiType | AxiosError<unknown, any>
    getContractMilestones: (responses: any) => void
}

export interface MilestoneCardPropType{
    milestoneId: number;
    milestoneDesc: string ;
    milestoneAmount: string;
    milestonePercentage: string;
    milestoneEndDate: string;
}

export interface visibleRange {
    start: number;
    end: number;
}

export interface MileStonePropType{
    milestones: Milestone[];
    loading: boolean;
    visibleRange: visibleRange;
    moveCards: (direction: string) => void;
}