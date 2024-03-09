import { FilterConfirmProps, SortOrder } from 'antd/lib/table/interface';

export interface Condition {
    [field:string]: string;
  }

 export interface ContractData {
    id:string;
    contract_ref_id: string;
    client_name: string;
    start_date: string;
    end_date: string;
    contract_type: string;
    contract_status: string;
  }

 export type TableColumn = {
    title: string;
    dataIndex?: string;
    key: string;
    sorter?: (a: ContractData, b: ContractData) => number;
    sortDirections?: SortOrder[];
    filterDropdown?: ({ selectedKeys, confirm, setSelectedKeys }: { selectedKeys: React.Key[]; confirm: (param?: FilterConfirmProps) => void;setSelectedKeys: (selectedKeys: React.Key[]) => void;}) => React.ReactNode;
    filterIcon?: () => React.ReactNode;
    onFilter?: (value: string, record: ContractData) => boolean;
    render?: (text: any, record: ContractData) => React.ReactNode;
};

export interface AllContractsPropType{
  columns:TableColumn[];
  
}