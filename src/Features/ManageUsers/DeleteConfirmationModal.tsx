import React from 'react';
import { Modal, Button } from 'antd';
import userTableStyles from './ManagerUsers.module.css'

interface DeleteConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName: string;
}

const DeleteConfirmationModal = ({ visible, onCancel, onConfirm, userName }: DeleteConfirmationModalProps) => {
  const title = "Do You Really Wish To Remove";

  return (
    <Modal
      title={title}
      open={visible} // Update to use 'open' instead of 'visible'
      onCancel={onCancel}
      className={userTableStyles.customDeleteConfirmation}
      footer={[
        <Button key="cancel" className={userTableStyles.customButton} onClick={onCancel}>
          No
        </Button>,
        <Button key="confirm" type="primary" className={userTableStyles.customButtonYes} onClick={onConfirm}>
          Yes
        </Button>,
      ]}
    >
      <div className={userTableStyles.customFooter}>
        <strong>{userName}</strong>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;