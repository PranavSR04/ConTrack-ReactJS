import React from 'react'
import DeleteConfirmationModal from './DeleteConfirmationModal';
import UpdateModal from './UpdateModal';
import userTableStyles from './ManagerUsers.module.css'
import { Table,Spin, Modal, message, Input, Button, Select, AutoComplete, TablePaginationConfig,PaginationProps, Card } from "antd";
import { ManageUserHandlerPropType, ManageUsersPropType } from './types';
import Toast from '../../Components/Toast/Toast';


const ManageUsers = (
  { 
    handleAddUser,
    hideDeleteConfirmation,handleDelete,
    handleSearch,
    handlePageChange,
    handleEditModalCancel,
    handleUpdateUser,
    rowClassName,
    debouncedFetchData,
    onSelectEmployee,
    getEmployee,
    setSelectedRoleId,
    columns,
    dropdownOptions,
    roleOptions,
    dataSource,
    pagination,
    editModalVisible,
    selectedRoleId,
    deleteConfirmationVisible,
    selectedUser,
    userAdded,
    loading,
    userUpdated,
    userDeleted,
    showToast,
    emptyUserToast,
    employeeNotFoundToast
  }:ManageUsersPropType) => {
  return (
    <>
      <h2 className={`${userTableStyles.pageTitle}`}>MANAGE USER</h2>
      <div className={` ${userTableStyles.wholeTable} `}>
        <AutoComplete
          className={`${userTableStyles.searchEmployeeBox}`}
          options={dropdownOptions.map((option) => ({ value: option.value }))}
          style={{ width: 200 }}
          placeholder="Search Employee"
          onSelect={onSelectEmployee}
          onSearch={(text) => {
            getEmployee(text);
            debouncedFetchData(text);
          }}
        />

        <Select
          className={`${userTableStyles.viewAccessBox}`}
          options={roleOptions}
          style={{ width: 200 }}
          onSelect={(value) => setSelectedRoleId(value as number)}
          placeholder="Select a role"
        />

        <Button
          className={`${userTableStyles.addUserButton}`}
          onClick={handleAddUser}
        >
          ADD USER
        </Button>

        {userAdded ? (
          <Toast message={"User Added Successfully"} messageType={"success"} />
        ) : (
          <></>
        )}

        {userUpdated ? (
          <Toast
            message={"User Updated Successfully"}
            messageType={"success"}
          />
        ) : (
          <></>
        )}

{userDeleted? 
        <Toast
        message={"User Deleted Successfully"}
        messageType={"warning"}
        />:<></>
        }
  {showToast && <Toast message="User Already Exists" messageType="error" />}
{emptyUserToast && <Toast message="No User Found" messageType="error" />}
{employeeNotFoundToast && <Toast message="No Employee Found" messageType="error" />}



      <Card className={`${userTableStyles.mainListContainer}`}>

          <Input
            className={`${userTableStyles.searchUserBox}`}
            placeholder="Search User... "
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            />
        
            <Table
              className={`${userTableStyles.userListTable}`}
              columns={columns}
              size='large'
              dataSource={dataSource}
              rowClassName={rowClassName}
              pagination={{
                position: ['bottomCenter'],
                ...pagination, 
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
              onChange={handlePageChange}
              loading={{ indicator: <div><Spin /></div>, spinning:loading}}
              // }
            />
        </Card>
      </div>

      <UpdateModal
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        updateUser={() => handleUpdateUser(selectedRoleId)}
        roleOptions={roleOptions}
        setSelectedRoleId={setSelectedRoleId} // Pass the setSelectedRoleId prop
      />

      <DeleteConfirmationModal
        visible={deleteConfirmationVisible}
        onCancel={hideDeleteConfirmation}
        onConfirm={() => selectedUser && handleDelete(selectedUser)}
        userName={selectedUser ? selectedUser.user_name : ""}
      />
    </>
  );
};

export default ManageUsers;
