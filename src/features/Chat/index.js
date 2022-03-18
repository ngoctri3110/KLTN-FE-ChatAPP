import { Col, Row, Spin } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FilterContainer from './components/FilterContainer';
import ConversationContainer from './containers/ConversationContainer';
import FooterChatContainer from './containers/FooterChatContainer';
import HeaderChatContainer from './containers/HeaderChatContainer';
import SearchContainer from './containers/SearchContainer';

import './style.scss';

function Chat() {
    //store
    const { conversations, isLoading } = useSelector((state) => state.chat);
    // filter search
    const [visibleFilter, setVisbleFilter] = useState(false);
    const [valueClassify, setValueClassify] = useState('0');
    return (
        <Spin spinning={isLoading}>
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
                            <div
                                className={`main-conversation_search-bar ${
                                    visibleFilter ? 'fillter' : ''
                                }`}
                            >
                                <SearchContainer />
                            </div>

                            {visibleFilter ? (
                                <FilterContainer />
                            ) : (
                                <>
                                    <div className="divider-layout">
                                        <div />
                                    </div>

                                    <div className="main-conversation_list-conversation">
                                        <ConversationContainer
                                            valueClassify={valueClassify}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
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
