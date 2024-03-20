import React from 'react';
import { render } from '@testing-library/react';
import Toast from '../../Components/Toast/Toast';

describe('Toast component', () => {
  it('renders without crashing', () => {
    const message = 'Test message';
    const messageType = 'success';

    const { container } = render(<Toast message={message} messageType={messageType} />);
    
    // Assert that the component renders without crashing
    expect(container).toBeInTheDocument();
  });
});
