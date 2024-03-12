import { Moment } from "moment";

export interface MsaDataType{
    msa_ref_id:string;
    client_name:string;
    region:string;
    start_date:Date;
    end_date:Date;
    file:File;
    comments?:string
}
export interface AddMsaPropsType{
    msaRefId: string | undefined;
    fileName: string | undefined;

    handleFileUpload: (info: any) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleDateChange: (date: Moment | null, dateString: string | string[]) => void;
    handleEndDateChange: (date: Moment | null, dateString: string | string[]) => void
    SubmitAddMsa: React.MouseEventHandler<HTMLElement> | undefined
}

export interface GenerateMsaIdResponse {
    exists: boolean;
}