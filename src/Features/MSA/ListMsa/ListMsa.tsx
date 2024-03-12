import React, { useEffect, useState } from "react";
import styles from "./ListMsa.module.css";
import { Dropdown, Menu, Space, Table, TableColumnsType } from "antd";
import { TableProps } from "react-bootstrap";
import axios from "axios";
import { DownOutlined, EditOutlined, SyncOutlined } from "@ant-design/icons";
import { MsaListDataType } from "./types";
const ListMsa = ({
  navigateToAddMsaHandler ,
  columns,
  data
}:MsaListDataType) => {
 
//   const [data, setData] = useState<MsaDataType[]>([]);
//   const [pageSize, setPageSize] = useState<number>(10);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/msa/list");
//         setData(response.data.data);
//         console.log(response.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   const columns: TableColumnsType<MsaDataType> = [
//     {
//       title: "MSA ID",
//       dataIndex: "msa_ref_id",
//     },
//     {
//       title: "Client Name",
//       dataIndex: "client_name",
//     },
//     {
//       title: "Start Date",
//       dataIndex: "start_date",
//     },
//     {
//       title: "End Date",
//       dataIndex: "end_date",
//     },
//     {
//       title: "Added By",
//       dataIndex: "added_by_user",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Space size="middle">
//           <a onClick={()=>handleRenewClick(record.msa_ref_id)}><SyncOutlined 
//           className={styles.ListMsa_renew_btn}
//           /></a>
//           <a onClick={()=>handleEditClick(record.msa_ref_id)}>
//             <EditOutlined className={styles.ListMsa_edit_btn} />
//             </a>
//         </Space>
//       ),
//     },
//   ];
//   const handlePageSizeChange = ({ key }: { key: React.Key }) => {
//     setPageSize(Number(key));
//   };
//   const DropdownTrigger = (
//     <div className={styles.dropdownTrigger}>
//         {pageSize} <DownOutlined />
//     </div>
// );
//   const menu = (
//     <Menu onClick={handlePageSizeChange}>
//       <Menu.Item key="5">5</Menu.Item>
//       <Menu.Item key="10">10</Menu.Item>
//     </Menu>
//   );
//   const navigateToAddMsaHandler = () => {
//     // Redirect to the AddMsaHandler component or page
//     window.location.href = '/msa/add';
// };

// const handleRenewClick = (msa_ref_id:string) => {
//     // Navigate to the sync page
//     window.location.href = `/msa/renew/${msa_ref_id}`;

// };

// const handleEditClick = (msa_ref_id:string) => {
//     // Navigate to the edit page
//     window.location.href = `/msa/edit/${msa_ref_id}`;

// };
  return (
    <>
      <div className={styles.ListMsa}>
        <h3 className={styles.ListMsa_heading}>MASTER SERVICE AGREEMENT</h3>
        <div className={styles.ListMsa_Details}>
          <div className={styles.ListMsa_Details_Table}>
            <div className={styles.ListMsa_Details_Table_row1}>
              <div className={styles.ListMsa_Details_Table_row1_col1}>
                <span className={styles.ListMsa_Details_Table_row1_col1_span}>Show </span>
                <span>10</span>
                <span className={styles.ListMsa_Details_Table_row1_col1_span}> entries</span>
              </div>
              <div className={styles.ListMsa_Details_Table_row1_col2}>
                <button 
                className={styles.ListMsa_Details_Table_row1_col2_button}
                onClick={navigateToAddMsaHandler}>
                    + Add Msa
                </button>
              </div>
            </div>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListMsa;
