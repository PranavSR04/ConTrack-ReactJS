import React from 'react';
import userTableStyles from '../../Features/ManageUsers/ManagerUsers.module.css'

const ForbiddenError = () => {
  return (
    <div className={userTableStyles.errorContainer}>
    <h1 className={userTableStyles.errorTitle}>403 Forbidden</h1>
    <p className={userTableStyles.errorMessage}>Sorry, you don't have access to this page.</p>
  </div>
  );
};

export default ForbiddenError;
