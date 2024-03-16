import { Moment } from "moment";

export interface MsaDataType{
    msa_ref_id:string;
    client_name:string;
    region:string;
    start_date:string;
    end_date:string;
    file:File;
    comments?:string
}
export interface AddMsaPropsType{
    msaRefId: string | undefined;
    fileName: string | undefined;
    msaAdded:boolean;
    handleFileUpload: (info: any) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleDateChange: (date: Moment | null, dateString: string | string[]) => void;
    handleEndDateChange: (date: Moment | null, dateString: string | string[]) => void
    SubmitAddMsa: React.MouseEventHandler<HTMLElement> | undefined
    handleAddMsa: () => void;
    isModalVisible: boolean;
    handleCancel: () => void;
    isLoading: boolean;
    validateStartDate: (value: any) => Promise<void>;
    handleOk: () => Promise<void>;
    fullPageSpinner: boolean




}

export interface GenerateMsaIdResponse {
    exists: boolean;
}