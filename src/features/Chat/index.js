import { Col, Row, Spin, Drawer } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import FilterContainer from './components/FilterContainer';
import ConversationContainer from './containers/ConversationContainer';
import FooterChatContainer from './containers/FooterChatContainer';
import HeaderChatContainer from './containers/HeaderChatContainer';
import SearchContainer from './containers/SearchContainer';
import conversationApi from 'api/conversationApi';
import { fetchListFriends } from './slice/chatSlice';
import { useLocation } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import BodyChatContainer from './containers/BodyChatContainer';
import './style.scss';
import renderWidthDrawer from 'utils/DrawerResponsive';
import GroupNews from './components/GroupNews';
import InfoContainer from './containers/InfoContainer';

Chat.propTypes = {
    idNewMessage: PropTypes.string,
};

Chat.defaultProps = {
    idNewMessage: '',
};

function Chat({ idNewMessage }) {
    const dispatch = useDispatch();

    //store
    const { conversations, isLoading, currentConversation, currentChannel } =
        useSelector((state) => state.chat);
    const { isJoinChatLayout, isJoinFriendLayout, user } = useSelector(
        (state) => state.global
    );
    //=========================================

    const location = useLocation();
    const [isOpenInfo, setIsOpenInfo] = useState(true);
    const [openDrawerInfo, setOpenDrawerInfo] = useState(false);

    const refCurrentConversation = useRef();
    const refConversations = useRef();
    const refCurrentChannel = useRef();
    const { width } = useWindowSize();
    const [hasMessage, setHasMessage] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const [scrollId, setScrollId] = useState('');
    const [replyMessage, setReplyMessage] = useState({});
    const [userMention, setUserMention] = useState({});
    const [usersTyping, setUsersTyping] = useState([]);
    const [visibleNews, setVisibleNews] = useState(false);
    const [tabActiveInNews, setTabActiveNews] = useState(0);

    // filter search=====================================
    const [visibleFilter, setVisbleFilter] = useState(false);
    const [valueClassify, setValueClassify] = useState('0');
    const [valueInput, setValueInput] = useState('');
    const [allConverFilter, setAllConverFilter] = useState([]);
    const [dualConverFilter, setDualConverFilter] = useState([]);
    const [groupConverFilter, setGroupConverFilter] = useState([]);

    //=========================================
    console.log('path', location.pathname);
    console.log('currentconver', currentConversation);
    //=============
    useEffect(() => {
        if (width > 1199) {
            setOpenDrawerInfo(false);
        }
    }, [width]);

    //Get Clientwidth

    useEffect(() => {
        refCurrentConversation.current = currentConversation;
    }, [currentConversation]);

    useEffect(() => {
        refConversations.current = conversations;
    }, [conversations]);
    useEffect(() => {
        refCurrentChannel.current = currentChannel;
    }, [currentChannel]);

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

    const handleBackToBottom = (value, message) => {
        if (message) {
            setHasMessage(message);
        } else {
            setHasMessage('');
        }
        setIsShow(value);
    };
    const hanldeResetScrollButton = (value) => {
        setIsScroll(value);
    };
    const handleOnFilterClassfiy = () => {};

    const handleScrollWhenSent = (value) => {
        setScrollId(value);
    };
    const handleCloseReply = () => {};

    const handleOnRemoveMention = () => {
        setUserMention({});
    };

    const handleViewVotes = () => {};
    useEffect(() => {
        setUsersTyping([]);
        setReplyMessage(null);
        setUserMention({});
    }, [currentConversation]);

    const handleOnMention = (userMent) => {
        if (user.id !== userMent.id) {
            setUserMention(userMent);
        }
    };
    const handleViewPolls = () => {
        if (width <= 1199) {
            setOpenDrawerInfo(true);
        }
        setVisibleNews(true);
        setTabActiveNews(1);
    };

    //Info Group====================
    const handleOnBack = () => {};
    const handleChangeActiveKey = () => {};

    //Info container================
    const handleChangeViewChannel = () => {};
    return (
        <Spin spinning={isLoading}>
            <div id="main-chat-wrapper">
                <Row gutter={[0, 0]}>
                    <Col
                        span={5}
                        xl={{ span: 5 }}
                        lg={{ span: 6 }}
                        md={{ span: 7 }}
                        sm={{ span: currentConversation ? 0 : 24 }}
                        xs={{ span: currentConversation ? 0 : 24 }}
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
                    {location.pathname === '/chat' && currentConversation ? (
                        <>
                            <Col
                                span={isOpenInfo ? 13 : 19}
                                xl={{ span: isOpenInfo ? 13 : 19 }}
                                lg={{ span: 18 }}
                                md={{ span: 17 }}
                                sm={{ span: currentConversation ? 24 : 0 }}
                                xs={{ span: currentConversation ? 24 : 0 }}
                            >
                                <div className="main_chat">
                                    <div className="main_chat-header">
                                        <HeaderChatContainer
                                            onPopUpInfo={() =>
                                                setIsOpenInfo(!isOpenInfo)
                                            }
                                            onOpenDrawer={() =>
                                                setOpenDrawerInfo(true)
                                            }
                                        />
                                    </div>
                                    <div className="main_chat-body">
                                        <div id="main_chat-body--view">
                                            <BodyChatContainer
                                                onBackToBottom={
                                                    handleBackToBottom
                                                }
                                                onResetScrollButton={
                                                    hanldeResetScrollButton
                                                }
                                                onMention={handleOnMention}
                                                onViewPolls={handleViewPolls}
                                            />
                                        </div>
                                        <div className="main_chat-body--input">
                                            <FooterChatContainer
                                                onScrollWhenSentText={
                                                    handleScrollWhenSent
                                                }
                                                replyMessage={replyMessage}
                                                onCloseReply={handleCloseReply}
                                                userMention={userMention}
                                                onRemoveMention={
                                                    handleOnRemoveMention
                                                }
                                                onViewVotes={handleViewVotes}
                                                onOpenInfoBlock={() =>
                                                    setIsOpenInfo(true)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                span={isOpenInfo ? 6 : 0}
                                xl={{ span: isOpenInfo ? 6 : 0 }}
                                lg={{ span: 0 }}
                                md={{ span: 0 }}
                                sm={{ span: 0 }}
                                xs={{ span: 0 }}
                            >
                                <div className="main-info">
                                    <Drawer
                                        key="right"
                                        className="drawer-responsive"
                                        placement="right"
                                        closable={false}
                                        visible={openDrawerInfo}
                                        bodyStyle={{ padding: 0 }}
                                        width={`${renderWidthDrawer(width)}%`}
                                        onClose={() => setOpenDrawerInfo(false)}
                                    >
                                        <>
                                            {visibleNews ? (
                                                <GroupNews
                                                    tabActive={tabActiveInNews}
                                                    onBack={handleOnBack}
                                                    onChange={
                                                        handleChangeActiveKey
                                                    }
                                                />
                                            ) : (
                                                <InfoContainer
                                                    onViewChannel={
                                                        handleChangeViewChannel
                                                    }
                                                    onOpenInfoBlock={() =>
                                                        setIsOpenInfo(true)
                                                    }
                                                />
                                            )}
                                        </>
                                    </Drawer>
                                </div>
                            </Col>
                        </>
                    ) : (
                        <Col
                            span={18}
                            xl={{ span: 18 }}
                            lg={{ span: 18 }}
                            md={{ span: 17 }}
                            sm={{ span: 0 }}
                            xs={{ span: 0 }}
                        >
                            <div className="landing-app">
                                <div className="title-welcome">
                                    <div className="title-welcome-heading">
                                        <span>
                                            Chào mừng đến với <b>Talo</b>
                                        </span>
                                    </div>

                                    <div className="title-welcome-detail">
                                        <span>
                                            Khám phá những tiện ích hỗ trợ làm
                                            việc và trò chuyện cùng người thân,
                                            bạn bè được tối ưu hoá cho máy tính
                                            của bạn.
                                        </span>
                                    </div>
                                </div>

                                <div className="carousel-slider">
                                    {/* <Slider /> */}
                                </div>
                            </div>
                        </Col>
                    )}
                </Row>
            </div>
        </Spin>
    );
}

export default Chat;
