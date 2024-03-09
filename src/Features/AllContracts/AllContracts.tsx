import React, { useState, useEffect } from 'react';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Spin, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps, TablePaginationConfig } from 'antd/lib/table/interface';
import styles from './contractsList.module.css'  ;
import { fetchDataFromApi } from './api/getContracts';
import { AllContractsPropType, ContractData ,TableColumn, paginations} from './types';

//This is the current working code

const AllContracts = ({columns, data, handleTableChange,actionClicked,pagination,loading}:AllContractsPropType) => {
 
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
     onChange={handleTableChange }
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
