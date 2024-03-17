import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DashBoardCount from '../../Components/DashBoardContractsCount/DashBoardCount';

describe('DashBoardCount component', () => {
    beforeAll(() => {
        window.matchMedia = jest.fn().mockImplementation(query => {
          return {
            matches: false,
            media: query,
            addListener: jest.fn(), // Mock addListener method
            removeListener: jest.fn(), // Mock removeListener method
            dispatchEvent: jest.fn(),
          };
        });
      });
  test('renders contract count correctly', () => {
    const contractCount = 10;
    const contractName = 'Contracts';
    const { getByText } = render(
      <DashBoardCount contractCount={contractCount} Contract={contractName} />
    );

    expect(getByText(contractName)).toBeInTheDocument();
    expect(getByText(contractCount.toString())).toBeInTheDocument();
  });

  // Add more tests as needed for other functionalities or styles.
});
