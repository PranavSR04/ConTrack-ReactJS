import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CloseContract from '../../Features/IndividualContract/CloseContract/CloseContract';

describe('CloseContract component', () => {
  it('renders without crashing', () => {
    const props = {
      visible: true,
      onCancel: jest.fn(),
      closeContract: jest.fn(),
      modalPopUp: jest.fn(),
      contractStatus: 'Open',
    };

    const { getByText } = render(<CloseContract {...props} />);

    // Assert that the "Close Contract" button is rendered
    expect(getByText('Close Contract')).toBeInTheDocument();
  });

  it('calls modalPopUp function when "Close Contract" button is clicked', () => {
    const props = {
      visible: true,
      onCancel: jest.fn(),
      closeContract: jest.fn(),
      modalPopUp: jest.fn(),
      contractStatus: 'Open',
    };

    const { getByText } = render(<CloseContract {...props} />);
    const closeButton = getByText('Close Contract');
    fireEvent.click(closeButton);
    expect(props.modalPopUp).toHaveBeenCalled();
  });

  it('does not render "Close Contract" button when contract status is "Closed"', () => {
    const props = {
      visible: true,
      onCancel: jest.fn(),
      closeContract: jest.fn(),
      modalPopUp: jest.fn(),
      contractStatus: 'Closed',
    };

    const { queryByText } = render(<CloseContract {...props} />);
    expect(queryByText('Close Contract')).toBeNull();
  });
});
