// RegionHorizontalBar.test.tsx

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import RegionHorizontalBar from '../../Components/RegionHorizontalBar/RegionHorizontalBar';

describe('RegionHorizontalBar component', () => {
  test('renders component without error', async () => {
    // const mockData = [
    //   {
    //     "region": "Europe",
    //     "contractCount": 10
    //   },
    //   {
    //     "region": "America",
    //     "contractCount": 6
    //   },
    //   {
    //     "region": "Asia",
    //     "contractCount": 3
    //   }
    // ];
    render(<RegionHorizontalBar />);
    // const { getByText } = render(<RegionHorizontalBar  />);
    // await waitFor(() => {
    //   expect(getByText('Top Contract Regions')).toBeInTheDocument();
    //   expect(getByText('Europe')).toBeInTheDocument();
    //   expect(getByText('America')).toBeInTheDocument();
    //   expect(getByText('Asia')).toBeInTheDocument();
    //   expect(getByText('10')).toBeInTheDocument();
    //   expect(getByText('6')).toBeInTheDocument();
    //   expect(getByText('3')).toBeInTheDocument();
    // });
  });
});
