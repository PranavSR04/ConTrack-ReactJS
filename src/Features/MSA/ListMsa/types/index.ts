import { TableColumnsType } from "antd";
import { TablePaginationConfig } from "antd/lib";

export  interface paginations {
  current: number;
  pageSize: number;
  total: number;
}
export interface Condition {
  [field:string]: string;
}
//  export interface MsaDataType {
//    id:number;
//     msa_ref_id: string;
//     client_name: string;
//     start_date: Date;
//     end_date: Date;
//     added_by: string;
//   }
  export interface MsaData {
    id:string;
    msa_ref_id: string;
    client_name: string;
    start_date: string;
    end_date: string;
    added_by_user: string;
    msa_doclink:string;
    is_active:string;
  
  }
  export type TableColumn = {
    title: string;
    dataIndex?: string;
    key: string;
    // sorter?: (a: ContractData, b: ContractData) => number;
    // sortDirections?: SortOrder[];
    // filterDropdown?: ({ selectedKeys, confirm, setSelectedKeys }: { selectedKeys: React.Key[]; confirm: (param?: FilterConfirmProps) => void;setSelectedKeys: (selectedKeys: React.Key[]) => void;}) => React.ReactNode;
    // filterIcon?: () => React.ReactNode;
    // onFilter?: (value: string, record: ContractData) => boolean;
    render?: (text: any, record:MsaData) => React.ReactNode;
    
};
  export interface MsaListDataType{
    // columns: TableColumnsType<MsaDataType>;
    data: MsaData[];
    pagination:paginations;
    handleTableChange:(pagination:TablePaginationConfig)=> void;
    columns:TableColumn[];
    msaAdded?:boolean;
    msaEdited?:boolean;
    edited: boolean;
    renew: boolean;
    handleSegmentChange?: (value: string) => void;
    getRowClassName: (record: any, index: number) => "even-row" | "odd-row";
    showInactiveMSA: () => Promise<void>;
    fetchData: () => Promise<void>;
    rowClassName: (record: MsaData, index: number) => string;
  }
  export interface LocationStateProps {
    added?: boolean;
  }