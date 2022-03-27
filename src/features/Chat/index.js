import { Col, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import FilterContainer from './components/FilterContainer';
import ConversationContainer from './containers/ConversationContainer';
import FooterChatContainer from './containers/FooterChatContainer';
import HeaderChatContainer from './containers/HeaderChatContainer';
import SearchContainer from './containers/SearchContainer';

import './style.scss';
import conversationApi from 'api/conversationApi';
import { fetchListFriends } from './slice/chatSlice';

Chat.propTypes = {
    idNewMessage: PropTypes.string,
};

Chat.defaultProps = {
    idNewMessage: '',
};

function Chat({ idNewMessage }) {
    const dispatch = useDispatch();

    //store
    const { conversations, isLoading } = useSelector((state) => state.chat);
    // filter search
    const [visibleFilter, setVisbleFilter] = useState(false);
    const [valueClassify, setValueClassify] = useState('0');
    const [valueInput, setValueInput] = useState('');
    const [allConverFilter, setAllConverFilter] = useState([]);
    const [dualConverFilter, setDualConverFilter] = useState([]);
    const [groupConverFilter, setGroupConverFilter] = useState([]);

    //=========================================
    const handleOnVisibleFilter = (value) => {
        if (value.trim().length > 0) {
            setVisbleFilter(true);
        } else {
            setVisbleFilter(false);
        }
    };
    const handleOnSearchChange = (value) => {
        setValueInput(value);
        handleOnVisibleFilter(value);
    };
    const handleOnSubmitSearch = async () => {
        try {
            // const all = await searchApi.searchConversations(valueInput);

            const all = await conversationApi.fetchListConversations(
                valueInput
            );
            // console.log(all);
            setAllConverFilter(all);

            const dual = await conversationApi.fetchListConversations(
                valueInput,
                'DUAL'
            );
            setDualConverFilter(dual);

            const group = await conversationApi.fetchListConversations(
                valueInput,
                'GROUP'
            );

            setGroupConverFilter(group);
        } catch (error) {
            console.log(error);
        }
    };
    //fetch friends
    useEffect(() => {
        dispatch(
            fetchListFriends({
                name: '',
            })
        );
        //eslint-disable-next-line
    }, []);

    const handleOnFilterClassfiy = () => {};
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
                                <SearchContainer
                                    onSearchChange={handleOnSearchChange}
                                    valueText={valueInput}
                                    onSubmitSearch={handleOnSubmitSearch}
                                    onFilterClasify={handleOnFilterClassfiy}
                                    valueClassify={valueClassify}
                                />
                            </div>

                            {visibleFilter ? (
                                <FilterContainer
                                    dataAll={allConverFilter}
                                    dataDual={dualConverFilter}
                                    dataGroup={groupConverFilter}
                                />
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
