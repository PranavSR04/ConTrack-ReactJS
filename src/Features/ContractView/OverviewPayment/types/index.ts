import { AxiosError } from "axios";
import { ContractApiType } from "../../FixedFee/types";

export interface OverviewHandlerType {
  responses: ContractApiType | AxiosError<unknown, any>;
  getOverview: (responses: any) => void;
}

export interface OverviewPropType {
  dateOfSignature: string;
  startDate: string;
  endDate: string;
  contractType: string;
  estimatedAmount: number;
  loading:boolean;
}
