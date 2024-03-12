
import { Button, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './contractsList.module.css'  ;
import { AllContractsPropType, ContractData } from './types';
import { useNavigate } from 'react-router';



const AllContracts = ({columns, data, handleTableChange,actionClicked,pagination,loading,}:AllContractsPropType) => {
  const navigate=useNavigate();
  const ROLE_ID = parseInt(localStorage.getItem('role_id') || '0', 10);    

  return (
    <>
    <h3 className={styles['contracts-h1']}>CONTRACTS OVERVIEW</h3>
    <div className={styles['contracts-table']}>
    {ROLE_ID !== 3 && (
    <Button className={styles['contracts-addContract']}>+ Add Contract</Button>
  )}     
    <Table className={styles['contracts-tableHead']}
     columns={columns as ColumnsType<ContractData>}
     dataSource={data.map((item) => ({ ...item, key: item.id }))}
     pagination={{
      ...pagination,
      position: ['bottomCenter'],
      itemRender: (current, type, originalElement) => {
        if (type === 'page') {
          return (
            <a style={{ background: current === pagination.current ? '#DC143C' : '',color: current === pagination.current ? 'white' : '',borderBlockColor: '#DC143C' ,border: 'none' }}>
              {current}
            </a>
          );
        }
        return originalElement;
      },
    }}
     onChange={handleTableChange }
    size='small'>
</Table>
      {loading && <Spin size="large" />}
      </div>
    </>
  );
};

export default AllContracts;
