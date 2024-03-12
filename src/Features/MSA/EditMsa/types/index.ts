import { Moment } from "moment";

export interface EditMsaHandlertype{
 msaData:MsaDataType;
}
export interface MsaDataType{
    msa_ref_id: string; 
    client_name: string;
     region: string; 
     start_date: string; 
     end_date: string; 
     comments?: string; 
     file?: File | null;
}