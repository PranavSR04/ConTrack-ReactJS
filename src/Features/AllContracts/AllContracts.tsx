
import { Button, Segmented, Spin, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './contractsList.module.css'  ;
import { AllContractsPropType, ContractData } from './types';
import { useNavigate } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';
import Toast from '../../Components/Toast/Toast';

const AllContracts = ({columns, data, handleTableChange,actionClicked,pagination,loading,pageTitle,rowClassName,locale
  ,showExpired,contractAddToast}:AllContractsPropType) => {
  const navigate=useNavigate();
  const ROLE_ID = parseInt(localStorage.getItem('role_id') || '0', 10);    

  return (
    <>
    <h3 className={styles['contracts-h1']}>{pageTitle}</h3>
    <div className={styles['contracts-table']}>
      <div className={styles['contracts-buttons']}>
      <div className={styles['contracts-buttons-expired']}>
   <label> Show Expired &nbsp; </label>
  <Switch size='small' onChange={showExpired} />
  </div>
    {ROLE_ID !== 3 && (
    <Button className={styles['contracts-addContract']} onClick={() => navigate('/addContract')}>+ Add Contract</Button>
  )}
  </div>
    <Table className={styles['contracts-tableHead']}
     columns={columns as ColumnsType<ContractData>}
     dataSource={data.map((item) => ({ ...item, key: item.id }))}
     locale={locale}
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
      showSizeChanger: false
    }}
     onChange={handleTableChange }
     rowClassName={rowClassName}
    size='small'
    loading={{ indicator: <div><LoadingOutlined style={{ fontSize: 30 }} spin /> </div>, spinning:loading}}>
</Table>
{contractAddToast&& <Toast messageType="success" message="Contract Added"></Toast>}
{/* {loading && <Spin size="large" />} */}
{/* {loading && <Spin className={styles.spinner}
    indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />} */}
      </div>
    </>
  );
};

export default AllContracts;
