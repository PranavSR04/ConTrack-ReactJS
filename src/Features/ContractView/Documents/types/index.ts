import { AxiosError } from "axios";
import { Addendum, ContractApiType } from "../../FixedFee/types";


export interface DocumentsHandlerType {
    responses: ContractApiType | AxiosError<unknown, any>;
    getContractDocuments: (responses: any) => void;
}

export interface DocumentsPropType{
    contractDocuments: string;
    contractRefId: string;
    clientName: string;
    loading: boolean;
    addendums: Addendum[];
}