import React from 'react'
import DeleteConfirmationModal from './DeleteConfirmationModal';
import UpdateModal from './UpdateModal';
import userTableStyles from './ManagerUsers.module.css'
import { Table, Modal, message, Input, Button, Select, AutoComplete, TablePaginationConfig,PaginationProps } from "antd";
import { ManageUserHandlerPropType, ManageUsersPropType } from './types';


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
    selectedUser
    }:ManageUsersPropType) => {
  return (
<>
    <div className={` ${userTableStyles.wholeTable} `}>
        <AutoComplete
            className={`${userTableStyles.searchEmployeeBox}`}
            options={dropdownOptions.map((option) => ({ value: option.value }))}
            style={{ width: 200 }}
            placeholder="Search Employee"
            onSelect={onSelectEmployee}
            onSearch={(text) => {
              getEmployee(text);
              debouncedFetchData(text)
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

      <div className={`${userTableStyles.mainListContainer}`}>

          <Input
            className={`${userTableStyles.searchUserBox}`}
            placeholder="Search User... "
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            />
        
            <Table
              className={`${userTableStyles.userListTable}`}
              columns={columns}
              dataSource={dataSource}
              rowClassName={rowClassName}
              pagination={pagination}
              onChange={handlePageChange}
              // }
            />
        </div>
      </div>

      <UpdateModal
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        updateUser={()=>handleUpdateUser(selectedRoleId)}
        roleOptions={roleOptions}
        setSelectedRoleId={setSelectedRoleId} // Pass the setSelectedRoleId prop
      />

      <DeleteConfirmationModal
        visible={deleteConfirmationVisible}
        onCancel={hideDeleteConfirmation}
        onConfirm={() => selectedUser && handleDelete(selectedUser)}
        userName={selectedUser? selectedUser.user_name:""}
      />
    </>
  )
}

export default ManageUsers
