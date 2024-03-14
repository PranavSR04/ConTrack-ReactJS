import React, { useEffect, useState } from 'react'
import ListMsa from './ListMsa'
import { MsaDataType } from './types';
import { Menu, Space, TableColumnsType } from 'antd';
import { DownOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import styles from "./ListMsa.module.css";
import axios from 'axios';
import { getapi } from './api/getapi';


const ListMsaHandler = () => {
   
  const [data, setData] = useState<MsaDataType[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const ROLE_ID = parseInt(localStorage.getItem('role_id') || '0', 10);    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getapi();
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const columns: TableColumnsType<MsaDataType> = [
    {
      title: 
        "MSA ID",
      dataIndex: "msa_ref_id",
      
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
    },
    {
      title: "Added By",
      dataIndex: "added_by_user",
    }
  ];
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text, record) => (
  //       <Space size="middle">
  //         <a onClick={()=>handleRenewClick(record.msa_ref_id)}><SyncOutlined 
  //         className={styles.ListMsa_renew_btn}
  //         /></a>
  //         <a onClick={()=>handleEditClick(record.msa_ref_id)}>
  //           <EditOutlined className={styles.ListMsa_edit_btn} />
  //           </a>
  //       </Space>
  //     ),
  //   },
  // ];

  if (ROLE_ID !== 3) {
    columns.push({
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleRenewClick(record.msa_ref_id)}>
            <SyncOutlined className={styles.ListMsa_renew_btn} />
          </a>
          <a onClick={() => handleEditClick(record.msa_ref_id)}>
            <EditOutlined className={styles.ListMsa_edit_btn} />
          </a>
        </Space>
      ),
    });
  }

  const getRowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  };
  const handlePageSizeChange = ({ key }: { key: React.Key }) => {
    setPageSize(Number(key));
  };

 
  const navigateToAddMsaHandler = () => {
    // Redirect to the AddMsaHandler component or page
    window.location.href = '/msa/add';
};

const handleRenewClick = (msa_ref_id:string) => {
    // Navigate to the sync page
    window.location.href = `/msa/renew/${msa_ref_id}`;

};

const handleEditClick = (msa_ref_id:string) => {
    // Navigate to the edit page
    window.location.href = `/msa/edit/${msa_ref_id}`;

};
  return (
   <ListMsa
   navigateToAddMsaHandler={navigateToAddMsaHandler}
   columns={columns}
   getRowClassName={getRowClassName}
   data={data}
   />
  )
}

export default ListMsaHandler
