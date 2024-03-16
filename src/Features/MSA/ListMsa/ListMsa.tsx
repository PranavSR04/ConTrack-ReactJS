import React, { useEffect, useState } from "react";
import styles from "./ListMsa.module.css";
import { Button, ConfigProvider, Dropdown, Menu, Pagination, Segmented, Space, Spin, Table, TableColumnsType } from "antd";
import { TableProps } from "react-bootstrap";
import axios from "axios";
import { DownOutlined, EditOutlined, LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { MsaListDataType } from "./types";
import { useNavigate } from "react-router";
import Toast from "../../../Components/Toast/Toast";
import ButtonGroup from "antd/es/button/button-group";
const ListMsa = ({
  columns,
  data,
  getRowClassName,
  pagination,
  handleTableChange,
  msaAdded,
  showInactiveMSA,
  fetchData,
  edited,
  rowClassName

}:MsaListDataType) => {
  const navigate=useNavigate();

  const [loading, setLoading] = useState(true);
  const ROLE_ID = parseInt(localStorage.getItem('role_id') || '0', 10);    

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  const [activeTab, setActiveTab] = useState("Active");

  const handleSegmentChange = (value:string) => {
      setActiveTab(value);
      if (value === "Active") {
          fetchData();
      } else if (value === "Inactive") {
          showInactiveMSA();
      }
  };

  return (
    <>
      <div className={styles.ListMsa}>
        <h3 className={styles.ListMsa_heading}>MASTER SERVICE AGREEMENT</h3>
        {/* <div className={styles.ListMsa_Details}> */}
          <div className={styles.ListMsa_Details_Table}>
            <div className={styles.ListMsa_Details_Table_row1}>
              <div className={styles.ListMsa_Details_Table_row1_col1}>
                {/* <span className={styles.ListMsa_Details_Table_row1_col1_span}>Show </span>
                <span>10</span>
                <span className={styles.ListMsa_Details_Table_row1_col1_span}>entries</span> */}
              </div>
              <div className={styles.ListMsa_Details_Table_row1_col2}>
                <ConfigProvider
								theme={{
									token: {
										borderRadius: 20,
										// borderRadiusLG: 50,
									},
									components: {
										Segmented: {
											itemSelectedBg: "#DC143C",
											itemSelectedColor: "#FFF",
										},
									},
								}}
							>
              <div className={styles.ListMsa_Details_Table_row1_msabutton}>
                <Segmented
                className={styles.ListMsa_Details_segment}
                options={ ["Active", "Inactive"]}
                defaultValue="Active"
                size="middle"
                onChange={(value) => {
                  handleSegmentChange(value);
                }}
               />
         
                </div>
                </ConfigProvider>
                {ROLE_ID !== 3 && (
                <button 
                className={styles.ListMsa_Details_Table_row1_col2_button}
                onClick={() => navigate('/msa/add')}>
                    + Add Msa
                </button>)}
              </div>
            </div>
            <Spin
              spinning={loading}
              indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
            >
            <Table 
            locale={{emptyText:" "} }
            columns={columns } 
            dataSource={data}
            
            className={styles.ListMsa_Details_Table_table}
            pagination={{
              ...pagination,
              position: ['bottomCenter'],
              showSizeChanger: false,
              itemRender: (current: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, type: string, originalElement: any) => {
                if (type === 'page') {
                  return (
                    <a 
                    style={{ 
                      background: current === pagination.current ? '#DC143C' : '',
                      color: current === pagination.current ? 'white' : '',
                      borderBlockColor: '#DC143C' ,
                      border: 'none' ,
                      textDecoration: 'none'}}>
                      {current}
                    </a>
                  );
                }
                return originalElement;
              },
            }}
            onChange={handleTableChange }
            size='small'
            rowClassName={rowClassName}

            >
              </Table>
            </Spin>
            {msaAdded?(
            <Toast messageType="success" message="MSA Added Successfully"></Toast>
          ) : (
            edited?<Toast messageType="success" message="MSA Edited Successfully"></Toast>:<></>
          )}
          
          </div>
        </div>
            {/* </div> */}
    </>
  );
};

export default ListMsa;
