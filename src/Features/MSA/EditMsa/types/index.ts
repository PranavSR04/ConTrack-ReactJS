import { Moment } from "moment";

export interface EditMsaHandlertype{
 msaData:MsaDataType;
 msa_ref_id:string;

 msaEdited:boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleDateChange?: (date: Moment | null, dateString: string | string[]) => void;
    handleEndDateChange?: (date: Moment | null, dateString: string | string[]) => void
    SubmitEditMsa: React.MouseEventHandler<HTMLElement> | undefined
    handleEditMsa: () => void;
    isModalVisible: boolean;
    handleCancel: () => void;
    isLoading: boolean;
    validateStartDate?: (value: any) => Promise<void>;
    //  confirmLoading:boolean

}
export interface MsaDataType{
    client_name: string;
     region: string; 
     start_date: string; 
     end_date: string; 
     comments:string;
}