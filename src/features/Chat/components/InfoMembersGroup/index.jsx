import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import InfoTitle from '../InfoTitle';
import Scrollbars from 'react-custom-scrollbars';
import { Button, Dropdown, Menu, message, Tag } from 'antd';
import { UserDeleteOutlined } from '@ant-design/icons';
import PersonalIcon from '../PersonalIcon';
import ModalSendAddFriend from 'components/ModalSendAddFriend';
import { useState } from 'react';
import UserCard from 'components/UserCard';
import userApi from 'api/userApi';
InfoMembersGroup.propTypes = {
    onBack: PropTypes.func,
    members: PropTypes.array,
    onChoseUser: PropTypes.func,
};

InfoMembersGroup.defaultProps = {
    onBack: null,
    members: [],
    onChoseUser: null,
};

function InfoMembersGroup({ onBack, members, onChoseUser }) {
    const { user } = useSelector((state) => state.global);
    const { currentConversation, conversations } = useSelector(
        (state) => state.chat
    );
    const converDataCurrent = conversations.find(
        (ele) => ele.id === currentConversation
    );
    const { leaderId, managerIds } = converDataCurrent;
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleUserCard, setIsVisibleUserCard] = useState(false);
    const [userAddFriend, setUserAddFriend] = useState({});
    const dispatch = useDispatch();

    const handleOnBack = (value) => {
        if (onBack) {
            onBack(value);
        }
    };
    const handleClickMember = () => {};

    const handleFindUser = async (value) => {
        try {
            const user = await userApi.findId(value);
            setUserAddFriend(user);
            setIsVisible(true);
        } catch (error) {
            message.error('Không tìm thấy người dùng');
        }
    };
    const handleFindUserProfile = async (value) => {
        try {
            const user = await userApi.findId(value);
            setUserAddFriend(user);
            setIsVisibleUserCard(true);
        } catch (error) {
            message.error('Không tìm thấy người dùng');
        }
    };
    const onCancel = () => {
        setIsVisible(false);
        setIsVisibleUserCard(true);
    };

    const onOk = () => {};
    const handleCancelModalUserCard = () => {
        setIsVisibleUserCard(false);
    };
    const hanldOnClosable = () => {
        setIsVisible(false);
        setIsVisibleUserCard(false);
    };

    console.log('userAddFriend', userAddFriend);
    const menu = (value) => (
        <Menu onClick={(e) => handleClickMember(e, value)}>
            {value.id !== user.id && (
                <>
                    {leaderId === user.id &&
                        !managerIds.find((ele) => ele === value.id) && (
                            <Menu.Item key="2">
                                <span className="menu-icon">
                                    Thêm phó nhóm{' '}
                                </span>
                            </Menu.Item>
                        )}

                    {leaderId === user.id &&
                        managerIds.find((ele) => ele === value.id) && (
                            <Menu.Item key="3">
                                <span className="menu-icon">
                                    Gỡ quyền phó nhóm{' '}
                                </span>
                            </Menu.Item>
                        )}

                    {(leaderId === user.id ||
                        managerIds.find((ele) => ele === user.id)) && (
                        <Menu.Item key="1" danger>
                            <span className="menu-icon">Mời ra khỏi nhóm</span>
                        </Menu.Item>
                    )}
                </>
            )}
        </Menu>
    );
    return (
        <div id="info_members-group">
            <div className="info_members-group-title">
                <InfoTitle
                    isBack={true}
                    text="Thành viên"
                    onBack={handleOnBack}
                    isSelect={false}
                />
            </div>
            <Scrollbars
                autoHide={true}
                autoHideTimeout={1000}
                autoHideDuration={200}
                style={{ width: '100%' }}
            >
                <div className="info_members-content">
                    <div className="info_members-content-title">
                        <strong>{`Danh sách thành viên (${members.length})`}</strong>
                    </div>

                    <div className="info_members-content-list">
                        {members.map((ele, index) => (
                            <Dropdown
                                key={index}
                                overlay={() => menu(ele)}
                                trigger={['contextMenu']}
                            >
                                <div className="info_members-content-item">
                                    <div
                                        className="info_members-content-item-leftside"
                                        onClick={() =>
                                            handleFindUserProfile(ele.id)
                                        }
                                    >
                                        <div className="info_members-content-item-leftside-avatar">
                                            <PersonalIcon
                                                avatar={ele.avatar?.url}
                                                demention={40}
                                                name={ele.name}
                                                isHost={
                                                    ele.id === leaderId ||
                                                    managerIds.find(
                                                        (managerId) =>
                                                            managerId === ele.id
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="info_members-content-item-leftside-name">
                                            <strong>{ele.name}</strong>
                                        </div>
                                    </div>

                                    <div
                                        className={`info_members-content-item-rightside ${
                                            ele.id === user.id && 'hidden'
                                        }`}
                                    >
                                        {!ele.isFriend ? (
                                            <Button
                                                type="primary"
                                                onClick={() =>
                                                    handleFindUser(ele.id)
                                                }
                                            >
                                                Kết bạn
                                            </Button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </Dropdown>
                        ))}
                    </div>
                </div>
            </Scrollbars>
            <ModalSendAddFriend
                isVisible={isVisible}
                onCancel={onCancel}
                onOk={onOk}
                userAddFriend={userAddFriend}
                onClosable={hanldOnClosable}
            />
            <UserCard
                user={userAddFriend}
                isVisible={isVisibleUserCard}
                onCancel={handleCancelModalUserCard}
            />
        </div>
    );
}

export default InfoMembersGroup;
