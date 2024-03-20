import React from 'react';
import { render } from '@testing-library/react';
import { AssociatedUsersType } from '../../Features/ContractView/MemberComments/types';
import MemberCards from '../../Features/ContractView/MemberComments/MemberCards';


describe('MemberCards component', () => {
  it('renders without crashing', () => {
    const associatedUsers: AssociatedUsersType[] = [
      { id: 1, contract_id: 1, user_name: 'User 1', user_mail: 'user1@example.com' },
      { id: 2, contract_id: 1, user_name: 'User 2', user_mail: 'user2@example.com' },
    ];

    const { container } = render(<MemberCards associatedUsers={associatedUsers} />);
    expect(container).toBeInTheDocument();
  });

  it('renders associated users correctly', () => {
    const associatedUsers: AssociatedUsersType[] = [
      { id: 1, contract_id: 1, user_name: 'User 1', user_mail: 'user1@example.com' },
      { id: 2, contract_id: 1, user_name: 'User 2', user_mail: 'user2@example.com' },
    ];

    const { getByText } = render(<MemberCards associatedUsers={associatedUsers} />);
    associatedUsers.forEach(user => {
      expect(getByText(user.user_name)).toBeInTheDocument();
    });
  });

});
