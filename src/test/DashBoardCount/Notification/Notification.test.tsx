import React from 'react'
import { render } from '@testing-library/react';
import Notification from '../../../Components/Notification/Notification';
import { NotificationProps } from '../../../Components/Notification/types';
const notification = {
    log_id: 123,
    contract_id: 456,
    msa_id: null,
    contract_ref_id: 789,
    msa_ref_id: null,
    client_name: "Example Client",
    performed_by: null,
    action: "Example action",
    updated_at: new Date(),
  };
describe ('Notification Test',()=>{
    it('Renders without crashing',()=>{
        const mockProps: NotificationProps={
            notification:notification,
            difference:"10",
            stylenames:'contrack'
        }
        render(<Notification {...mockProps} />);
    })
});