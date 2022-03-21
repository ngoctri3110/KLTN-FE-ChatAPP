import { FilterFilled } from '@ant-design/icons';
import { Col, Row, Spin } from 'antd';
import SearchContainer from 'features/Chat/containers/SearchContainer';
import React, { useEffect, useState } from 'react';
import ICON_FRIEND from 'assets/images/icon/icon_friend.png';
import ICON_GROUP from 'assets/images/icon/icon_group.png';
import './style.scss';
import HeaderFriend from './components/HeaderFriend';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends, fetchListRequestFriend } from './friendSlice';
import ListRequestFriend from './components/ListRequestFriend';
import ListFriend from './components/ListFriend';
import { fetchListFriends } from 'features/Chat/slice/chatSlice';

function Friend() {
    const { user } = useSelector((state) => state.global);
    const { requestFriends, isLoading, friends } = useSelector(
        (state) => state.friend
    );
    const dispatch = useDispatch();

    const [subTab, setSubTab] = useState(0);

    // filter search
    const [visibleFilter, setVisbleFilter] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [isActiveTab, setActiveTab] = useState(false);

    useEffect(() => {
        dispatch(fetchListRequestFriend());
        dispatch(
            fetchFriends({
                name: '',
            })
        );
        //eslint-disable-next-line
    }, []);
    return (
        <Spin spinning={isLoading}>
            <div id="main-friend_wrapper">
                <Row gutter={[0, 0]}>
                    <Col
                        span={5}
                        xl={{ span: 5 }}
                        lg={{ span: 6 }}
                        md={{ span: 7 }}
                    >
                        <div className="main-friend_sidebar">
                            <div className="main-friend_sidebar_search-bar">
                                {/* <SearchContainer
                                    valueText={valueInput}
                                    isFriendPage={true}
                                /> */}
                            </div>

                            {visibleFilter ? (
                                <FilterFilled />
                            ) : (
                                <>
                                    <div className="main-friend_sidebar_bottom">
                                        <div
                                            className="main-friend_sidebar_option"
                                            onClick={() => {
                                                setSubTab(0);
                                                setActiveTab(true);
                                            }}
                                        >
                                            <div className="main-friend_sidebar_option_img">
                                                <img
                                                    src={ICON_FRIEND}
                                                    alt="ICON_FRIEND"
                                                />
                                            </div>
                                            <div className="main-friend_sidebar_option_text">
                                                Danh sách kết bạn
                                            </div>
                                        </div>

                                        <div
                                            className="main-friend_sidebar_option"
                                            onClick={() => {
                                                setSubTab(1);
                                                setActiveTab(true);
                                            }}
                                        >
                                            <div className="main-friend_sidebar_option_img">
                                                <img
                                                    src={ICON_GROUP}
                                                    alt="ICON_GROUP"
                                                />
                                            </div>

                                            <div className="main-friend_sidebar_option_text">
                                                Danh sách nhóm
                                            </div>
                                        </div>
                                        <div className="divider-layout">
                                            <div></div>
                                        </div>
                                        <div className="main-friend_sidebar_list-friend">
                                            <div className="main-friend_sidebar_list-friend_title">
                                                Bạn bè ({friends.length})
                                            </div>
                                            <ListFriend data={friends} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Col>

                    <Col
                        span={19}
                        xl={{ span: 19 }}
                        lg={{ span: 18 }}
                        md={{ span: 17 }}
                    >
                        <div className="main-friend_body">
                            <div className="main-friend_body__header">
                                <HeaderFriend
                                    onBack={() => setActiveTab(false)}
                                    subtab={subTab}
                                />
                            </div>
                            <div className="main-friend_body__section">
                                <div className="main-friend_body_item">
                                    <Scrollbars
                                        autoHide={true}
                                        autoHideTimeout={1000}
                                        autoHideDuration={200}
                                        style={{ height: '100%' }}
                                    >
                                        {subTab === 0 && (
                                            <div className="main-friend_body_list-request">
                                                <div className="main-friend_body_title-list">
                                                    Gợi ý kết bạn (5)
                                                </div>
                                                <div className="main-friend_body_title-list">
                                                    Lời mời kết bạn (
                                                    {requestFriends.length})
                                                </div>
                                                <ListRequestFriend
                                                    data={requestFriends}
                                                />

                                                <div className="main-friend_body_title-list">
                                                    Đã gửi yêu cầu kết bạn (5)
                                                </div>
                                            </div>
                                        )}
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Spin>
    );
}

export default Friend;
