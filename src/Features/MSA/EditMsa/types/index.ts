import { Moment } from "moment";

export interface EditMsaHandlertype{
 msaData:MsaDataType;
 msa_ref_id:string;

    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleDateChange: (date: Moment | null, dateString: string | string[]) => void;
    handleEndDateChange: (date: Moment | null, dateString: string | string[]) => void
    SubmitAddMsa: React.MouseEventHandler<HTMLElement> | undefined

}
export interface MsaDataType{
    client_name: string;
     region: string; 
     start_date: string; 
     end_date: string; 
}