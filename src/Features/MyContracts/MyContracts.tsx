import React, { useRef, useState, useEffect } from 'react';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, GetRef, Input, Spin, Table, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps, SortOrder } from 'antd/lib/table/interface';
import styles from '../AllContracts/contractsList.module.css'  ;
import { fetchDataFromApi } from './api/getContracts';

const userId=1;
export interface Condition {
  [field:string]: string;
}

interface ContractData {
  id:string;
  contract_ref_id: string;
  client_name: string;
  start_date: string;
  end_date: string;
  contract_type: string;
  contract_status: string;
}

const AllContracts: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // Adjust the type accordingly
  const [searchConditions, setSearchConditions] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false);


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Default page size
    total: 0,     // Total items  from your API
  });
  useEffect(() => {
    fetchData(); // Fetch initial data
  }, [searchConditions, pagination.current, pagination.pageSize]); // Refetch data when searchText or searchField changes

  const fetchData = async () => {
    try {
      setLoading(true);

      const result = await fetchDataFromApi(searchConditions, pagination.current, pagination.pageSize, userId);

      setData(result.data);
      setPagination({
        ...pagination,
        total: result.total,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
   
  };
  const onSearch = ( selectedKeys: string, selectedField: string) => {
    setIsEmptySearch(false);
    setSearchConditions((prevConditions) => ({...prevConditions, [selectedField]: selectedKeys }));
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
          accessKey={dataIndex}
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
              confirm({
                closeDropdown: false,
              })}}>Clear All Search</Button>
      </div>
      )
    },
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value: boolean | React.Key, record: ContractData) =>
      (record[dataIndex as keyof ContractData] as string).toLowerCase().includes(value.toString().toLowerCase()),
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

  type TableColumn = {
    title: string;
    dataIndex?: string;
    key: string;
    sorter?: (a: ContractData, b: ContractData) => number;
    sortDirections?: SortOrder[];
    filterDropdown?: ({ selectedKeys, confirm, setSelectedKeys }: { selectedKeys: React.Key[]; confirm: (param?: FilterConfirmProps) => void;setSelectedKeys: (selectedKeys: React.Key[]) => void;}) => React.ReactNode;
    filterIcon?: (filtered: boolean) => React.ReactNode;
    onFilter?: (value: string, record: ContractData) => boolean;
    render?: (text: any, record: ContractData) => React.ReactNode;
};
const columns: TableColumn[] = desiredColumnKeys.map((key) => ({
  title: customHeadings[key],
  dataIndex: key,
  key,
  sorter: (a: ContractData, b: ContractData) => (a[key as keyof ContractData]).localeCompare(b[key as keyof ContractData]),
  sortDirections: ['ascend', 'descend'],
  ...getColumnSearchProps(key),
}));

  let actionClicked = false;

  const oneditPage = (e: string) => {
    actionClicked = true;
    window.alert(e);
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
    <h2 className={styles['contracts-h1']}>MY CONTRACTS</h2>
    <div className={styles['contracts-table']}>
     <Button className={styles['contracts-addContract']}>+ Add Contract</Button>
     <Table<ContractData> className={styles['contracts-tableHead']}
     columns={columns as ColumnsType<ContractData>}
     dataSource={data.map((item) => ({ ...item, key: item.id }))}
     pagination={{
      ...pagination,
      position: ['bottomCenter'],
      itemRender: (current, type, originalElement) => {
        if (type === 'page') {
          return (
            <a style={{ background: current === pagination.current ? '#DC143C' : '',color: current === pagination.current ? 'white' : '' }}>
              {current}
            </a>
          );
        }
        return originalElement;
      },
    }}
     onChange={handleTableChange}
     onRow={(record) => ({
     onClick: (e) => {
      e.preventDefault();
      if (!actionClicked) {
        window.alert(record.id);
      }
    },
  })}
  size="middle">
</Table>
      {loading && <Spin size="large" />}
      </div>
    </>
  );
};

export default AllContracts;
