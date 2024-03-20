/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ScatterPlot from '../../Components/RevenueScatterPlot/ScatterPlot';

describe('ScatterPlot', () => {
  it('renders without crashing', () => {
    // Render the component
    render(<ScatterPlot scatterData={[]} data={{ datasets: [] }} fetchContractRevenue={function (): Promise<void> {
        throw new Error('Function not implemented.');
    } } />);

    // Assert that the component is rendered
    const scatterPlotElement = screen.getByTestId('scatter-plot');
    expect(scatterPlotElement).toBeInTheDocument();
  });
});
