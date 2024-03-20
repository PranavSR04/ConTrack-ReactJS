import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import AllContractsHandler from "../../Features/AllContracts/AllContractsHandler";
import { AllContractsPropType, ContractData, TableColumn, locale, paginations } from "../../Features/AllContracts/types";

describe('AllContractsHandler component', () => {
  const mockColumns: TableColumn[] = [
    {
      title: 'Contract ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Contract Reference ID',
      dataIndex: 'contract_ref_id',
      key: 'contract_ref_id',
    },
    {
      title: 'Client Name',
      dataIndex: 'client_name',
      key: 'client_name',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Contract Type',
      dataIndex: 'contract_type',
      key: 'contract_type',
    },
    {
      title: 'Contract Status',
      dataIndex: 'contract_status',
      key: 'contract_status',
    },
    {
      title: 'DU',
      dataIndex: 'du',
      key: 'du',
    },
  ];
  
  const mockData: ContractData[] = [
    {
      id: '1',
      contract_ref_id: 'CON123',
      client_name: 'Client A',
      start_date: '2022-01-01',
      end_date: '2022-12-31',
      contract_type: 'TM',
      contract_status: 'Active',
      du: 'DU1',
    },
    {
      id: '2',
      contract_ref_id: 'CON456',
      client_name: 'Client B',
      start_date: '2022-02-01',
      end_date: '2022-11-30',
      contract_type: 'Type B',
      contract_status: 'Expired',
      du: 'DU2',
    },

  ];
  
  const mockPagination: paginations = {
    current: 1,
    pageSize: 10,
    total: 2,
  };
  
  const mockLocale: locale = {
    emptyText: 'No data available',
  };
  
  const mockAllContractsProps: AllContractsPropType = {
    columns: mockColumns,
    data: mockData,
    pagination: mockPagination,
    handleTableChange: () => {},
    actionClicked: false,
    loading: false,
    pageTitle: 'All Contracts',
    rowClassName: () => '', 
    locale: mockLocale,
    showExpired: () => {}, 
    contractAddToast: false,
    contractEditToast: false,
    isMyContracts: false,
    handleSegmentChange: () => {},
  };

//   it('renders', () => {
//     render(
//       <BrowserRouter>
//         <AllContractsHandler {...mockAllContractsProps} />
//       </BrowserRouter>
//     );
   
//   });
});
