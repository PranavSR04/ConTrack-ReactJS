
import { Button, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './contractsList.module.css'  ;
import { AllContractsPropType, ContractData } from './types';
import { useNavigate } from 'react-router';

const AllContracts = ({columns, data, handleTableChange,actionClicked,pagination,loading,pageTitle,rowClassName}:AllContractsPropType) => {
  const navigate=useNavigate();
  const ROLE_ID = parseInt(localStorage.getItem('role_id') || '0', 10);    

  return (
    <>
      <h3 className={styles["contracts-h1"]}>{pageTitle}</h3>
      <div className={styles["contracts-table"]}>
        {ROLE_ID !== 3 && (
          <Button
            className={styles["contracts-addContract"]}
            onClick={() => navigate("/allContracts/addContract")}
          >
            + Add Contract
          </Button>
        )}
        <Table
          className={styles["contracts-tableHead"]}
          columns={columns as ColumnsType<ContractData>}
          dataSource={data.map((item) => ({ ...item, key: item.id }))}
          pagination={{
            ...pagination,
            position: ["bottomCenter"],
            itemRender: (current, type, originalElement) => {
              if (type === "page") {
                return (
                  <a
                    style={{
                      background:
                        current === pagination.current ? "#DC143C" : "",
                      color: current === pagination.current ? "white" : "",
                      borderBlockColor: "#DC143C",
                      border: "none",
                    }}
                  >
                    {current}
                  </a>
                );
              }
              return originalElement;
            },
          }}
          onChange={handleTableChange}
          rowClassName={rowClassName}
          size="small"
        ></Table>
        {loading && <Spin size="large" />}
      </div>
    </>
  );
};

export default AllContracts;
