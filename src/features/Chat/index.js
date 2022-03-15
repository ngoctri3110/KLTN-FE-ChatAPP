import { Col, Row, Spin } from 'antd';
import React from 'react';
import ConversationContainer from './containers/ConversationContainer';
import FooterChatContainer from './containers/FooterChatContainer';
import HeaderChatContainer from './containers/HeaderChatContainer';
import SearchContainer from './containers/SearchContainer';
// import { useRouteMatch } from 'react-router';

import './style.scss';

function Chat() {
    // const { path } = useRouteMatch();

    return (
        <Spin spinning={false}>
            <div id="main-chat-wrapper">
                <Row gutter={[0, 0]}>
                    <Col
                        span={5}
                        xl={{ span: 5 }}
                        lg={{ span: 6 }}
                        md={{ span: 7 }}
                        sm={{ span: 8 }}
                        xs={{ span: 9 }}
                    >
                        <div className="main-conversation">
                            <div>
                                <SearchContainer />
                            </div>
                        </div>
                        <>
                            <div className="divider-layout">
                                <div />
                            </div>

                            <div className="main-conversation_list-conversation">
                                <ConversationContainer />
                            </div>
                        </>
                    </Col>
                    <>
                        <Col
                            span={19}
                            xl={{ span: 19 }}
                            lg={{ span: 18 }}
                            md={{ span: 17 }}
                        >
                            <div className="main_chat">
                                <div className="main_chat-header">
                                    <HeaderChatContainer />
                                </div>
                                <div className="main_chat-body">
                                    <div id="main_chat-body--view">
                                        <p>Body chat</p>
                                    </div>
                                    <div className="main_chat-body--input">
                                        <FooterChatContainer />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </>
                </Row>
            </div>
        </Spin>
    );
}

export default Chat;
