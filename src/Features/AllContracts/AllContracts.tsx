
import { Button, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './contractsList.module.css'  ;
import { AllContractsPropType, ContractData } from './types';
import { useNavigate } from 'react-router';

//This is the current working code

const AllContracts = ({columns, data, handleTableChange,actionClicked,pagination,loading}:AllContractsPropType) => {
  const navigate=useNavigate();
  return (
    <>
    <h2 className={styles['contracts-h1']}>CONTRACTS OVERVIEW</h2>
    <div className={styles['contracts-table']}>
     <Button className={styles['contracts-addContract']}>+ Add Contract</Button>
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
     onRow={(record) => ({
     onClick: (e) => {
      e.preventDefault();
      if (!actionClicked) {
        navigate(`/fixedfee`,{state:{id:record.id as string}});
      }
    },
  })} size='small'>
</Table>
      {loading && <Spin size="large" />}
      </div>
    </>
  );
};

export default AllContracts;