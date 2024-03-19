import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UpdateModal from '../../Features/ManageUsers/UpdateModal';

describe('UpdateModal', () => {
  const onCancelMock = jest.fn();
  const updateUserMock = jest.fn();
  const setSelectedRoleIdMock = jest.fn();
  const roleOptionsMock = [
    { label: 'Admin', value: 1 },
    { label: 'User', value: 2 },
  ];

  it('renders correctly and handles update', async () => {
    // render(
    //     <UpdateModal
    //       visible={true}
    //       onCancel={onCancelMock}
    //       updateUser={updateUserMock}
    //       setSelectedRoleId={setSelectedRoleIdMock}
    //       roleOptions={roleOptionsMock}
    //     />
    //   );
    const { getByText, findByPlaceholderText } = render(
      <UpdateModal
        visible={true}
        onCancel={onCancelMock}
        updateUser={updateUserMock}
        setSelectedRoleId={setSelectedRoleIdMock}
        roleOptions={roleOptionsMock}
      />
    );

    // Find the select component asynchronously
    const selectElement =  getByText('Select a role');
    
    // Check if the select component is rendered
    expect(selectElement).toBeInTheDocument();

    // Simulate selecting a role
    // fireEvent.change(selectElement, { target: { value: '1' } });
    fireEvent.mouseDown(selectElement); // Open the dropdown
    const option = await waitFor(() => getByText('Admin')); // Find the option
    fireEvent.click(option); // Click the option

    // Check if setSelectedRoleId is called with the correct value
    expect(setSelectedRoleIdMock).toHaveBeenCalledWith(1);

    // Simulate clicking the save button
    fireEvent.click(getByText('Save'));

    // Check if updateUser function is called
    expect(updateUserMock).toHaveBeenCalled();

    // Simulate clicking the cancel button
    fireEvent.click(getByText('Cancel'));

    // Check if onCancel function is called
    expect(onCancelMock).toHaveBeenCalled();
  });
});
