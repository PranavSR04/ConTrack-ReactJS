import { AxiosError } from "axios";
import { ContractApiType } from "../../FixedFee/types";

export interface HeadingHandlerType{
    responses: ContractApiType | AxiosError<unknown, any>
    getContractHeading: (responses: any) => void
}


export interface HeadingPropType{
    contractRefId: string;
    clientName: string;
    region: string;
    du: string;
    contractStatus: string;
}