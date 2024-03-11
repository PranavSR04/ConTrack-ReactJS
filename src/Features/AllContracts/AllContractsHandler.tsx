import React, { useState, useEffect } from 'react';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Spin, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps, TablePaginationConfig } from 'antd/lib/table/interface';
import styles from './contractsList.module.css'  ;
import { fetchDataFromApi } from './api/getContracts';
import { ContractData ,TableColumn} from './types';
import AllContracts from './AllContracts';
import { AllContractsPropType } from './types';
import { useNavigate } from 'react-router';
const AllContractsHandler = () => {
  const [data, setData] = useState<ContractData[]>([]); 
  const [searchConditions, setSearchConditions] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [actionClicked, setActionClicked]= useState<boolean>(false);
  const navigate=useNavigate();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Default page size
    total: 0,     // Total items  from API
  });
  useEffect(() => {
    fetchData(); // Fetch initial data
  }, [searchConditions, pagination.current, pagination.pageSize]); // Refetch data when searchText or searchField changes

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetchDataFromApi(searchConditions, pagination.current, pagination.pageSize);
      setData(result.data);
      console.log('result:',result.data)
      console.log('toatal page',result.total);
      setPagination({
        ...pagination,
        total: result.total,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    if ('current' in pagination && 'pageSize' in pagination) {
      setPagination({
        current: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        total: pagination.total || 0,
      });
    }
  
  };
  const onSearch = ( selectedKeys: string, selectedField: string) => {
    setIsEmptySearch(false); 
    setSearchConditions((prevConditions) => ({...prevConditions, [selectedField]: selectedKeys }));
    console.log(searchConditions);
  };

  const clearSearch = ( ) => {
    setSearchConditions({});
    setIsEmptySearch(true);    
  };

  const getColumnSearchProps = (dataIndex: string) => {
    return{
    filterDropdown: ({ selectedKeys,confirm, setSelectedKeys}: { selectedKeys: React.Key[]; confirm: (param?: FilterConfirmProps) => void;setSelectedKeys: (selectedKeys: React.Key[]) => void;}) => { 
      return (<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Search ${(customHeadings as Record<string, string>)[dataIndex]}`}
          onChange={(e) => { setSelectedKeys([e.target.value]);onSearch(e.target.value, dataIndex)}}
          value={isEmptySearch?"":selectedKeys[0]}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Button onClick={() => {
          clearSearch();          
              }}>Clear All Search</Button>
      </div>
      )
    },
    filterIcon: () => (
      <SearchOutlined/>
    ),
    }};
  
  const customHeadings:Record<string, string> = {
    'contract_ref_id': 'Contract ID',
    'client_name': 'Client Name',
    'start_date': 'Start Date',
    'end_date': 'End Date',
    'contract_type': ' Type',
    'contract_status': 'Status',
  };

  const desiredColumnKeys = ['contract_ref_id', 'client_name', 'start_date', 'end_date', 'contract_type'];

const columns: TableColumn[] = desiredColumnKeys.map((key) => ({
  title: customHeadings[key],
  dataIndex: key,
  key,
  sorter: (a: ContractData, b: ContractData) => (a[key as keyof ContractData]).localeCompare(b[key as keyof ContractData]),
  sortDirections: ['ascend', 'descend'],
  ...getColumnSearchProps(key),
}));


  const oneditPage = (id: string) => {
    setActionClicked(true);
    window.alert('edit');
    navigate(`editContract/${id}`)
  };

  columns.push({
    title: 'Status',
    dataIndex: 'contract_status',
    key: 'contract_status',
    sorter: (a: ContractData, b: ContractData) => a.contract_status.localeCompare(b.contract_status),
    sortDirections: ['ascend', 'descend'],
    ...getColumnSearchProps('contract_status'),
    render: (status: string) => {
      // let color = 'green'; // Default color
      let className = 'status-active';
      if (status === 'On Progress') {
        className = 'status-onprogress';
      } else if (status === 'Closed') {
        className = 'status-closed';
      }  
      return <Tag className={className} >{status}</Tag>;
    },
  });
  
  columns.push({
    title: 'Action',
    key: 'action',
    render: (text:any, record:ContractData) => (
      <span>
        <EditOutlined
          style={{ fontSize: '16px', color: '#DC143C' }}
          onClick={() => {
            oneditPage(record.id);
          }}
        />
      </span>
    ),
  });

  return (
    <>
      <AllContracts 
      columns={columns}
      data={data}
      pagination={pagination}
     handleTableChange={handleTableChange}
     actionClicked={actionClicked}
     loading={loading}
      

      />
    </>
  )
}

export default AllContractsHandler
