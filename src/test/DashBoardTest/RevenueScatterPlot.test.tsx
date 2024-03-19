import React from 'react';
import { render } from '@testing-library/react';
import ScatterPlot from '../../Components/RevenueScatterPlot/ScatterPlot'

describe('ScatterPlot', () => {
  it('renders correctly', () => {
    const fetchContractRevenueMock = jest.fn(); // Mock function for fetchContractRevenue
    const scatterDataMock = [
        { x: 10, y: 1000000 },
        { x: 20, y: 2000000 },
        { x: 30, y: 3000000 },
        { x: 40, y: 4000000 },
        { x: 50, y: 5000000 },
      ];
      
      const dataMock = {
        datasets: [
          {
            label: 'Scatter Data',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            data: scatterDataMock.map(point => ({ x: point.x, y: point.y })),
            pointBackgroundColor: 'rgba(75,192,192,1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
        ],
      };

    const { getByText } = render(
      <ScatterPlot
        fetchContractRevenue={fetchContractRevenueMock}
        scatterData={scatterDataMock}
        data={dataMock}
      />
    );

    // Assert that the component renders correctly
    expect(getByText('Contract Term (in months)')).toBeInTheDocument();
    expect(getByText('Revenue (USD)')).toBeInTheDocument();
  });

  // Add more test cases as needed to cover different scenarios and functionalities
});
