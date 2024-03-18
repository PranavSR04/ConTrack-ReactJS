import React from 'react'
import Login from '../../Features/Login/Login';
import { LoginPropType } from '../../Features/Login/types';
import { render } from '@testing-library/react';

describe ('login_test',()=>{
    it('Renders without crashing', () => {
        const mockProps = {
            handleOk: jest.fn(),
            isModalOpen: false,
            handleCancel: jest.fn(),
            errorMsg: "",
            handleLogin: jest.fn(),
        };

        render(<Login {...mockProps} />);
    });
})