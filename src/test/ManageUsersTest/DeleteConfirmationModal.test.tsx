/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteConfirmationModal from '../../Features/ManageUsers/DeleteConfirmationModal'

describe('DeleteConfirmationModal', () => {
  const onCancelMock = jest.fn();
  const onConfirmMock = jest.fn();
  const userName = 'Test User';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct props', () => {
    const { getByText } = render(
      <DeleteConfirmationModal
        visible={true}
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
        userName={userName}
      />
    );

    expect(getByText('Do You Really Wish To Remove')).toBeInTheDocument();
    expect(getByText('No')).toBeInTheDocument();
    expect(getByText('Yes')).toBeInTheDocument();
    expect(getByText(userName)).toBeInTheDocument();
  });

  it('calls onCancel when "No" button is clicked', () => {
    const { getByText } = render(
      <DeleteConfirmationModal
        visible={true}
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
        userName={userName}
      />
    );

    fireEvent.click(getByText('No'));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
    expect(onConfirmMock).not.toHaveBeenCalled();
  });

  it('calls onConfirm when "Yes" button is clicked', () => {
    const { getByText } = render(
      <DeleteConfirmationModal
        visible={true}
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
        userName={userName}
      />
    );

    fireEvent.click(getByText('Yes'));
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
    expect(onCancelMock).not.toHaveBeenCalled();
  });
});
