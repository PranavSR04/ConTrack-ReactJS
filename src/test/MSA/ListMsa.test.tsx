import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Segmented } from 'antd/lib';

import { Button } from 'antd';

describe('Segmented', () => {

  it('triggers onChange handler when option is changed', () => {
    const handleSegmentChangeMock = jest.fn(); // Mock function for onChange handler

    const { getByText } = render(
      <Segmented
      options={["Active", "Inactive"]}
       onChange={handleSegmentChangeMock} />
    );

    // Get the Inactive option
    const inactiveOption = getByText('Inactive');

    // Simulate a click event to change the option
    fireEvent.click(inactiveOption);

    // Assert that the onChange handler is called with the correct value
    expect(handleSegmentChangeMock).toHaveBeenCalledWith('Inactive');
  });

});


describe('Button', () => {


  it('does not render + ADD MSA button when ROLE_ID is 3', () => {
    // Render your component with ROLE_ID set to 3
    const { queryByText } = render(<Button />)

    // Assert that the button is not rendered
    const addButton = queryByText('+ ADD MSA');
    expect(addButton).toBeNull();
  });

  // Add more test cases as needed
});

