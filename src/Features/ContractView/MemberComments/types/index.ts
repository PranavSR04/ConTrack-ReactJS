import { AxiosError } from "axios";
import { ContractApiType } from "../../FixedFee/types";


export interface MemberCommentsHandlerType {
    responses: ContractApiType | AxiosError<unknown, any>;
    getMemberComments: (responses: any) => void;
}

export interface MemberCommentsPropType{
    comments: string;
    associatedUsers: AssociatedUsersType[];
    loading: boolean;
}

export interface AssociatedUsersType{
    id: number;
    contract_id: number;
    user_name: string;
    user_mail: string;
}