import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DashBoardRevenue from '../../Components/DashBoardRevenue/DashBoardRevenue';

describe('DashBoardRevenue component', () => {
  it('renders with given props', () => {
    const currentMonthRevenue = 5000;
    const previousMonthRevenue = 4000;
    const responsetype = 'Revenue';

    render(
      <DashBoardRevenue
        currentMonthRevenue={currentMonthRevenue}
        previousMonthRevenue={previousMonthRevenue}
        responsetype={responsetype}
      />
    );

    expect(screen.getByText(responsetype)).toBeInTheDocument();

  });

  // Add more test cases as needed
});
