import React, { useState, useEffect } from 'react';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Spin, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import styles from './contractsList.module.css'  ;
import { fetchDataFromApi } from './api/getContracts';
import { AllContractsPropType, ContractData ,TableColumn} from './types';

//This is the current working code

const AllContracts = ({columns}:AllContractsPropType) => {
  const [data, setData] = useState<any[]>([]); 
  const [searchConditions, setSearchConditions] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false);

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

  let actionClicked = false;

  const oneditPage = (e: string) => {
    actionClicked = true;
    window.alert(e);
  };

  return (
    <>
    <h2 className={styles['contracts-h1']}>CONTRACTS OVERVIEW</h2>
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
  })} size='middle'>
</Table>
      {loading && <Spin size="large" />}
      </div>
    </>
  );
};

export default AllContracts;
