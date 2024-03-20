import React from 'react';
import { render } from '@testing-library/react';
import Toast from '../../Components/Toast/Toast';

describe('Toast component', () => {
  test('renders with success message', () => {
    const mockNotification = jest.fn();

    // Render the component with a success message
    const { getByText }  =render(<Toast message="Success message" messageType="success" />);
    const pElement = getByText('Success message');
   
  });

  test('renders with warning message', () => {
    const mockNotification = jest.fn();

    // Render the component with a success message
    const { getByText }  =render(<Toast message="warning message" messageType="warning" />);
    const pElement = getByText('warning message');
   
  });

  test('renders with error message', () => {
    const mockNotification = jest.fn();

    // Render the component with a success message
    const { getByText }  =render(<Toast message="error message" messageType="error" />);
    const pElement = getByText('error message');
   
  });

  test('renders with info message', () => {
    const mockNotification = jest.fn();

    // Render the component with a success message
    const { getByText }  =render(<Toast message="info message" messageType="info" />);
    const pElement = getByText('info message');
   
  });

});
