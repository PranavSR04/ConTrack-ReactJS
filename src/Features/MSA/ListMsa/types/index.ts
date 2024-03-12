import { TableColumnsType } from "antd";

 export interface MsaDataType {
    msa_ref_id: string;
    client_name: string;
    start_date: Date;
    end_date: Date;
    added_by_user: string;
  }
  export interface MsaListDataType{
    navigateToAddMsaHandler: () => void;
    columns: TableColumnsType<MsaDataType>;
    data: MsaDataType[];
  }