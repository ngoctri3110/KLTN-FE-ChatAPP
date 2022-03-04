import { Spin } from 'antd';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ForgotPage from './pages/ForgotPage';
import LoginPage from './pages/LoginPage';
import RegistryPage from './pages/RegistryPage';

import './style.scss';
function Account(props) {
    return (
        <Spin spinning={false}>
            <div id="account_page">
                <Routes>
                    <Route path="" element={<LoginPage />} />
                    <Route
                        path="/account/registry"
                        element={<RegistryPage />}
                    />
                    <Route path="/account/forgot" element={<ForgotPage />} />
                </Routes>
            </div>
        </Spin>
    );
}

export default Account;
