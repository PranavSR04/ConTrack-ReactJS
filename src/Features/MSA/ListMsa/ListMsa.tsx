import React, { useEffect, useState } from "react";
import styles from "./ListMsa.module.css";
import { Dropdown, Menu, Pagination, Space, Spin, Table, TableColumnsType } from "antd";
import { TableProps } from "react-bootstrap";
import axios from "axios";
import { DownOutlined, EditOutlined, LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { MsaListDataType } from "./types";
const ListMsa = ({
  navigateToAddMsaHandler ,
  columns,
  data,
  getRowClassName
}:MsaListDataType) => {
  const [loading, setLoading] = useState(true);
  const ROLE_ID = parseInt(localStorage.getItem('role_id') || '0', 10);    

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <div className={styles.ListMsa}>
        <h3 className={styles.ListMsa_heading}>MASTER SERVICE AGREEMENT</h3>
        <div className={styles.ListMsa_Details}>
          <div className={styles.ListMsa_Details_Table}>
            <div className={styles.ListMsa_Details_Table_row1}>
              <div className={styles.ListMsa_Details_Table_row1_col1}>
                {/* <span className={styles.ListMsa_Details_Table_row1_col1_span}>Show </span>
                <span>10</span>
                <span className={styles.ListMsa_Details_Table_row1_col1_span}>entries</span> */}
              </div>
              <div className={styles.ListMsa_Details_Table_row1_col2}>
                { ROLE_ID!==3 &&
                  <button 
                className={styles.ListMsa_Details_Table_row1_col2_button}
                onClick={navigateToAddMsaHandler}>
                    + Add Msa
                </button>}
              </div>
            </div>
            <Spin
              spinning={loading}
              indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
            >
            <Table 
            columns={columns} 
            dataSource={data} 
            rowClassName={getRowClassName}
            className={styles.ListMsa_Details_Table_table}

            />
            </Spin>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListMsa;
