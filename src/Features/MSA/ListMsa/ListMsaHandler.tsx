import React, { useEffect, useState } from 'react'
import ListMsa from './ListMsa'
import { LocationStateProps, MsaData, TableColumn } from './types';
import { Button, Input, Menu, Space, TableColumnsType } from 'antd';
import { CloudDownloadOutlined, DownOutlined, EditOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import styles from "./ListMsa.module.css";
import axios from 'axios';
import { getapi } from './api/getapi';
import { TablePaginationConfig } from 'antd/lib';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { useLocation, useNavigate } from 'react-router';
import { getapi_inactivemsa } from './api/getapi_inactivemsa';
import tableStyles from './ListMsa.module.css'  ; 


const ListMsaHandler = () => {
  //let added=false;
  const navigate=useNavigate();
  const location = useLocation();
  const [added, setAdded] = useState(false);
  const[edited,setEdited]=useState(false);

  useEffect(() => {
      if (location.state) {
        if (location.state.added) {
          setAdded(true);
          console.log(added);
        }
        else if (location.state.edited) {
         setEdited(true);
      }
          setTimeout(() => {
            window.history.replaceState(null, '');
        }, 0);
      }
  }, [location.state]);
  
  const [data, setData] = useState<MsaData[]>([]);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [searchConditions, setSearchConditions] = useState<Record<string,string>>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Default page size
    total: 0,     // Total items  from API
  });
  const [actionClicked, setActionClicked]= useState<boolean>(false);
  const[isActive,setIsActive]=useState<boolean>(true);
  const customHeadings:Record<string, string> = {
    'msa_ref_id': 'MSA ID',
    'client_name': 'Client Name',
    'start_date': 'Start Date',
    'end_date': 'End Date',
    'added_by_user': ' Added By'
  };

  const ROLE_ID = parseInt(localStorage.getItem('role_id') || '0', 10);    

  useEffect(() => {
    if(isActive){

    fetchData();
    }else{
      setActionClicked(true)
      showInactiveMSA();
    }
  }, [searchConditions,pagination.current, pagination.pageSize]);
  const fetchData = async () => {
    try {
      setActionClicked(false)
      const response = await getapi(pagination.current, pagination.pageSize,searchConditions);
     // const inactiveresponse= await getapi_inactivemsa(pagination.current, pagination.pageSize,searchConditions);
      setData(response.data);
     // console.log("inactive response",inactiveresponse)
      setPagination({
        ...pagination,
        total: response.total,
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
const showInactiveMSA=async()=>{
  try {
    setIsActive(false);
    setActionClicked(true);
    const inactiveresponse= await getapi_inactivemsa(pagination.current, pagination.pageSize,searchConditions);
    console.log(inactiveresponse)
    setData(inactiveresponse);
    console.log("inactive response",inactiveresponse)
    setPagination({
      ...pagination,
      total: inactiveresponse.total,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
  console.log("Data for Table:",data)
  const handleTableChange = (pagination: TablePaginationConfig) => {
    if ('current' in pagination && 'pageSize' in pagination) {
      setPagination({
        current: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        total: pagination.total || 0,
      });
    }
  
  };
  const rowClassName = (record:MsaData, index: number): string => {
    // Add a custom class to alternate rows
    return index % 2 === 0 ? tableStyles['oddRow'] : tableStyles['evenRow'];
  };
  const desiredColumnKeys = ['msa_ref_id', 'client_name', 'start_date', 'end_date'];
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
    const onSearch = ( selectedKeys: string, selectedField: string) => {
      setIsEmptySearch(false); 
      setSearchConditions((prevConditions) => ({...prevConditions, [selectedField]: selectedKeys }));
      console.log(searchConditions);
    };
  
    const clearSearch = ( ) => {
      setSearchConditions({});
      setIsEmptySearch(true);    
    };
    const oneditPage = (msa_ref_id: string) => {
      setActionClicked(true);
      navigate(`/msa/edit`, { state: { msa_ref_id: msa_ref_id as string } });
    };
    const onrenewPage = (msa_ref_id: string) => {
      setActionClicked(true);
      navigate(`/msa/renew`, { state: { msa_ref_id: msa_ref_id as string } });
    };
  const columns: TableColumn[] = desiredColumnKeys.map((key) => ({
    title: customHeadings[key],
    dataIndex: key,
    key,
    sorter: (a: MsaData, b: MsaData) => (a[key as keyof MsaData]).localeCompare(b[key as keyof MsaData]),
    sortDirections: ['ascend', 'descend'],
    ...getColumnSearchProps(key),
  }));
  {   ROLE_ID !==3 &&
    columns.push({
     title: 'Action',
     key: 'action',
     render: (text:any, record:MsaData) => (
      <div className='listmsa-action-icons'>
      <span className='listmsa-action-renew'>
        <SyncOutlined
        title='Renew MSA'
        className='listmsa-action-renew'
        style={{ fontSize: '16px', color: '#DC143C' ,paddingRight:"10px" }}
        onClick={() => {
          onrenewPage(record.msa_ref_id);
        }}/>
      </span>
      
       <span className='listmsa-action-edit'>
        {actionClicked?<></>:
         <EditOutlined
         title='Edit MSA'
         className='listmsa-action-edit-icon'
           style={{ fontSize: '18px', color: '#DC143C' ,paddingRight:"10px" }}
           onClick={() => {
             oneditPage(record.msa_ref_id);
           }}
         />}
       </span>
       <span>
        <a href={record.msa_doclink}>
       <CloudDownloadOutlined
       title='Download MSA'
                  style={{ fontSize: '18px', color: '#DC143C',paddingRight:"5px" }}
                 />
        </a>
       </span>
       
       </div>
     ),
   });
  }

  

   const getRowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  };
  return (
   <ListMsa
   handleTableChange={handleTableChange}
   columns={columns}
   pagination={pagination}
   getRowClassName={getRowClassName}
   data={data}
    msaAdded={added}
    edited={edited}
    fetchData={fetchData}
    showInactiveMSA={showInactiveMSA}
    rowClassName={rowClassName}
   />
  )
  }

export default ListMsaHandler
