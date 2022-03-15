import { Spin } from 'antd';

import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ForgotPage from './pages/ForgotPage';
import LoginPage from './pages/LoginPage';
import RegistryPage from './pages/RegistryPage';

import './style.scss';
function Account(props) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.global);
    const { isLoadingAccount } = useSelector((state) => state.account);

    if (user) {
        if (user.isAdmin) navigate('/admin');
        else navigate('/chat');
    }
    return (
        <Spin spinning={isLoadingAccount}>
            <div id="account_page">
                <Routes>
                    <Route index path="" element={<LoginPage />} />
                    <Route path="account/registry" element={<RegistryPage />} />
                    <Route path="account/forgot" element={<ForgotPage />} />
                </Routes>
            </div>
        </Spin>
    );
}

export default Account;
