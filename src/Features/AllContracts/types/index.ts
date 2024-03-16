import {
  FilterConfirmProps,
  SortOrder,
  TablePaginationConfig,
} from "antd/lib/table/interface";
import { ReactNode } from "react";

export interface Condition {
  [field: string]: string;
}
export interface paginations {
  current: number;
  pageSize: number;
  total: number;
}
export interface locale {
  emptyText: string | ReactNode;
}

export interface ContractData {
  id: string;
  contract_ref_id: string;
  client_name: string;
  start_date: string;
  end_date: string;
  contract_type: string;
  contract_status: string;
  du: string;
}

export type TableColumn = {
  title: string;
  dataIndex?: string;
  key: string;
  sorter?: (a: ContractData, b: ContractData) => number;
  sortDirections?: SortOrder[];
  filterDropdown?: ({
    selectedKeys,
    confirm,
    setSelectedKeys,
  }: {
    selectedKeys: React.Key[];
    confirm: (param?: FilterConfirmProps) => void;
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
  }) => React.ReactNode;
  filterIcon?: () => React.ReactNode;
  onFilter?: (value: string, record: ContractData) => boolean;
  render?: (text: any, record: ContractData) => React.ReactNode;
};

export interface AllContractsPropType {
  columns: TableColumn[];
  data: ContractData[];
  pagination: paginations;
  handleTableChange: (pagination: TablePaginationConfig) => void;
  actionClicked: boolean;
  loading: boolean;
  pageTitle: string;
  rowClassName: (record: ContractData, index: number) => string;
  locale: locale;
  showExpired: (checked: boolean) => void;
  contractAddToast: boolean;
  contractEditToast: boolean;
}
