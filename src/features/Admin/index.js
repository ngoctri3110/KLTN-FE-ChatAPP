import { Button, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SiderBar from './components/SiderBar';
import StickerGroupPage from './pages/StickerGroupPage';
import UserPage from './pages/UserPage';
import './style.scss';

const Admin = () => {
    return (
        <>
            <Layout hasSider>
                <SiderBar />
                <Layout
                    className="site-layout"
                    style={{
                        marginLeft: 200,
                    }}
                >
                    <Content
                        style={{
                            margin: '24px 16px 0',
                            overflow: 'initial',
                        }}
                    >
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                textAlign: 'center',
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<UserPage />} />
                                <Route
                                    path="/stickers"
                                    element={<StickerGroupPage />}
                                />
                            </Routes>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Admin;
