import React from 'react';
import { render } from '@testing-library/react';
import ManageUsers from '../../Features/ManageUsers/ManageUsers'; // Import the component you want to test
import { debounce } from 'lodash';
import { User } from '../../Features/ManageUsers/types';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

const mockFetchEmployeeList = jest.fn();

const debouncedFetchData = debounce(mockFetchEmployeeList, 2000);

describe('ManageUsers Component', () => {
  test('renders without crashing', () => {
    render(<ManageUsers     
        handleAddUser={jest.fn()}
        hideDeleteConfirmation={jest.fn()}
        handleDelete={jest.fn()}
        handleSearch={jest.fn()}
        handlePageChange={jest.fn()}
        handleEditModalCancel={jest.fn()}
        handleUpdateUser={jest.fn()}
        rowClassName={(record, index) => 'custom-row-class'} // Example function to generate row class name
        debouncedFetchData={debouncedFetchData}
        onSelectEmployee={jest.fn()}
        getEmployee={jest.fn()}
        setSelectedEmployeeId={jest.fn()}
        setSelectedRoleId={jest.fn()}
        columns={[]}
        dropdownOptions={[]}
        roleOptions={[]}
        dataSource={[]}
        pagination={{ current: 1, pageSize: 10, total: 100 }} // Example pagination object
        editModalVisible={false}
        selectedRoleId={0}
        deleteConfirmationVisible={false}
        selectedUser={null}
        userAdded={false}
        loading={false}
        userUpdated={false}
        userDeleted={false}
        showToast={false}
        emptyUserToast={false}
        employeeNotFoundToast={false}
        selectedEmployeeId={null}
        dropDownLoading={false} showDeleteConfirmation={function (record: User): void {
            throw new Error('Function not implemented.');
        } } setDeleteConfirmationVisible={function (value: React.SetStateAction<boolean>): void {
            throw new Error('Function not implemented.');
        } } setDataSource={function (value: React.SetStateAction<User[]>): void {
            throw new Error('Function not implemented.');
        } } setUserUpdated={function (value: React.SetStateAction<boolean>): void {
            throw new Error('Function not implemented.');
        } } showUpdateChoice={function (record: User): void {
            throw new Error('Function not implemented.');
        } } setDropdownOptions={function (value: React.SetStateAction<{ label: string; value: number; }[]>): void {
            throw new Error('Function not implemented.');
        } }    />);
  });
});
