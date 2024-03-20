import React from 'react';
import { render } from '@testing-library/react';
import ForbiddenError from '../../Components/AccessDenied/AccessDenied';

// Mock CSS modules
jest.mock('../../Features/ManageUsers/ManagerUsers.module.css', () => ({
  errorContainer: 'mockErrorContainer',
  errorTitle: 'mockErrorTitle',
  errorMessage: 'mockErrorMessage',
}));

describe('ForbiddenError component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<ForbiddenError />);
    
    // Check if the text "403 Forbidden" is rendered
    expect(getByText('403 Forbidden')).toBeInTheDocument();
    
    // Check if the text "Sorry, you don't have access to this page." is rendered
    expect(getByText("Sorry, you don't have access to this page.")).toBeInTheDocument();
    
    // Check if the error container has the appropriate class
    const errorContainer = getByText('403 Forbidden').parentElement;
    expect(errorContainer).toHaveClass('mockErrorContainer');
    
    // Check if the error title has the appropriate class
    const errorTitle = getByText('403 Forbidden');
    expect(errorTitle).toHaveClass('mockErrorTitle');
    
    // Check if the error message has the appropriate class
    const errorMessage = getByText("Sorry, you don't have access to this page.");
    expect(errorMessage).toHaveClass('mockErrorMessage');
  });
});
