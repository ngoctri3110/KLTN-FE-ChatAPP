import { Col, Row } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import NavbarContainer from 'features/Chat/containers/NavbarContainer';
import Chat from 'features/Chat';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Friend from 'features/Friend';

const ChatLayout = () => {
    return (
        <div>
            <Row gutter={[0, 0]}>
                <Col
                    span={1}
                    xl={{ span: 1 }}
                    lg={{ span: 1 }}
                    md={{ span: 2 }}
                    sm={{ span: 3 }}
                    xs={{ span: 4 }}
                >
                    <NavbarContainer />
                </Col>

                <Col
                    span={23}
                    xl={{ span: 23 }}
                    lg={{ span: 23 }}
                    md={{ span: 22 }}
                    sm={{ span: 21 }}
                    xs={{ span: 20 }}
                >
                    <Routes>
                        <Route index path="" element={<Chat />} />
                        <Route path="friends" element={<Friend />} />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Col>
            </Row>
        </div>
    );
};

export default ChatLayout;
