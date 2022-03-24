import {
    CaretDownOutlined,
    FilterFilled,
    FilterOutlined,
    SwapOutlined,
} from '@ant-design/icons';
import { Button, Col, Collapse, Dropdown, Menu, Row, Spin } from 'antd';
import SearchContainer from 'features/Chat/containers/SearchContainer';
import React, { useEffect, useRef, useState } from 'react';
import ICON_FRIEND from 'assets/images/icon/icon_friend.png';
import ICON_GROUP from 'assets/images/icon/icon_group.png';
import './style.scss';
import HeaderFriend from './components/HeaderFriend';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchFriends,
    fetchListGroup,
    fetchListMyRequestFriend,
    fetchListRequestFriend,
    fetchSuggestFriend,
} from './friendSlice';
import ListRequestFriend from './components/ListRequestFriend';
import ListFriend from './components/ListFriend';
import { fetchListFriends } from 'features/Chat/slice/chatSlice';
import ListSuggest from './components/ListSuggest';
import ListMyRequestFriend from './components/ListMyRequestFriend';
import FRIEND_STYLE from './friendStyle';
import { getValueFromKey } from 'constants/filterFriend';
import ListGroup from './components/ListGroup';
import { sortGroup } from 'utils/groupUtils';

function Friend() {
    const { user } = useSelector((state) => state.global);
    const {
        requestFriends,
        isLoading,
        friends,
        suggestFriends,
        myRequestFriend,
        groups,
    } = useSelector((state) => state.friend);
    const dispatch = useDispatch();

    const [subTab, setSubTab] = useState(0);
    const { Panel } = Collapse;
    const [currentFilterLeft, setCurrentFilterLeft] = useState('1');
    const [currentFilterRight, setCurrentFilterRight] = useState('1');

    const [groupCurrent, setGroupCurrent] = useState([]);
    const refFiller = useRef();
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
        dispatch(fetchSuggestFriend());
        dispatch(fetchListMyRequestFriend());
        dispatch(fetchListGroup({ name: '', type: 'GROUP' }));

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (groups.length > 0) {
            const temp = sortGroup(groups, 1);
            setGroupCurrent(temp);
            refFiller.current = temp;
        }
    }, [groups]);

    const handleMenuLeftSelect = () => {};

    const menuLeft = (
        <Menu onClick={handleMenuLeftSelect}>
            <Menu.Item key="1">Tất cả</Menu.Item>
            <Menu.Item key="2">Nhóm tôi quản lý</Menu.Item>
        </Menu>
    );

    const handleMenuRightSelect = () => {};

    const menuRight = (
        <Menu onClick={handleMenuRightSelect}>
            <Menu.Item key="1">Theo tên nhóm từ (A-Z)</Menu.Item>
            <Menu.Item key="2">Theo tên nhóm từ (Z-A)</Menu.Item>
        </Menu>
    );

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
                                                <Collapse
                                                    defaultActiveKey={['3']}
                                                    ghost
                                                >
                                                    <Panel
                                                        className="main-friend_body_title-list"
                                                        header={`Gợi ý kết bạn (${suggestFriends.length})`}
                                                        key="1"
                                                    >
                                                        <ListSuggest
                                                            data={
                                                                suggestFriends
                                                            }
                                                        />
                                                    </Panel>

                                                    <Panel
                                                        className="main-friend_body_title-list"
                                                        header={`Đã gửi yêu cầu kết bạn (${myRequestFriend.length})`}
                                                        key="2"
                                                    >
                                                        <ListMyRequestFriend
                                                            data={
                                                                myRequestFriend
                                                            }
                                                        />
                                                    </Panel>
                                                    <Panel
                                                        className="main-friend_body_title-list"
                                                        header={`Lời mời kết bạn(${requestFriends.length})`}
                                                        key="3"
                                                    >
                                                        <ListRequestFriend
                                                            data={
                                                                requestFriends
                                                            }
                                                        />
                                                    </Panel>
                                                </Collapse>
                                            </div>
                                        )}

                                        {subTab === 1 && (
                                            <>
                                                <div className="main-friend_body__filter">
                                                    <div className="main-friend_body__filter--left">
                                                        <Dropdown
                                                            overlay={menuLeft}
                                                            placement="bottomLeft"
                                                        >
                                                            <Button
                                                                icon={
                                                                    <CaretDownOutlined />
                                                                }
                                                                type="text"
                                                                style={
                                                                    FRIEND_STYLE.BUTTON_FILTER
                                                                }
                                                            >
                                                                {` ${getValueFromKey(
                                                                    'LEFT',
                                                                    currentFilterLeft
                                                                )} (${
                                                                    groupCurrent.length
                                                                })`}
                                                            </Button>
                                                        </Dropdown>
                                                    </div>

                                                    <div className="main-friend_body__filter--right">
                                                        <Dropdown
                                                            overlay={menuRight}
                                                            placement="bottomLeft"
                                                        >
                                                            <Button
                                                                icon={
                                                                    <SwapOutlined rotate="90" />
                                                                }
                                                                type="text"
                                                                style={
                                                                    FRIEND_STYLE.BUTTON_FILTER
                                                                }
                                                            >
                                                                {` ${getValueFromKey(
                                                                    'RIGHT',
                                                                    currentFilterRight
                                                                )}`}
                                                            </Button>
                                                        </Dropdown>
                                                    </div>
                                                </div>

                                                <div className="main-friend_body__list-group">
                                                    <ListGroup
                                                        data={groupCurrent}
                                                    />
                                                </div>
                                            </>
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
