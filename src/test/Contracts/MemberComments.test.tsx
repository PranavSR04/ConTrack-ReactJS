import React from 'react';
import { render } from '@testing-library/react';
import MemberComments from '../../Features/ContractView/MemberComments/MemberComments';
import { AssociatedUsersType } from '../../Features/ContractView/MemberComments/types';

describe('MemberComments component', () => {
  it('renders associated members and comments/remarks', () => {
    const comments = 'Some comments';
    const associatedUsers:AssociatedUsersType[]  = [
        { id: 1, contract_id: 1, user_name: 'User 1', user_mail: 'user1@example.com' },
        { id: 2, contract_id: 1, user_name: 'User 2', user_mail: 'user2@example.com' },
    ];
    const loading = false;

    const { getByText } = render(
      <MemberComments comments={comments} associatedUsers={associatedUsers} loading={loading} />
    );
    expect(getByText('Associated Members')).toBeInTheDocument();
    associatedUsers.forEach((user) => {
      expect(getByText(user.user_name)).toBeInTheDocument();
    });
    expect(getByText('Comments/Remarks')).toBeInTheDocument();
    expect(getByText(comments)).toBeInTheDocument();
  });
});
