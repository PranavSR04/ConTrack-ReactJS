import React from 'react';
import { render } from '@testing-library/react';
import Milestones from '../../Features/ContractView/Milestones/Milestones';

describe('Milestones component', () => {
  it('renders without crashing', () => {
    const milestones = [
        {
          id: 1,
          milestone_desc: 'Milestone 1',
          amount: '$1000',
          milestone_enddate: '2024-05-01',
          percentage: '50%',
          contract_id: 123, 
          created_at: '2024-01-01', 
          updated_at: '2024-01-01', 
        },
      ];

    const visibleRange = { start: 0, end: 2 };

    const moveCards = jest.fn();

    const { getByText } = render(
      <Milestones
        milestones={milestones}
        loading={false}
        visibleRange={visibleRange}
        moveCards={moveCards}
      />
    );

  });
});
