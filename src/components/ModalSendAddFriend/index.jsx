import { Avatar, Image, Modal, Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import COVERPHOTO_DEFAULT from 'assets/images/user/talo_coverPhoto_default.png';
import UserCardStyle from 'components/UserCard/UserCardStyle';
import USER_AVATAR_DEFAULT from 'assets/images/user/talo_user_default.jpg';
import getSummaryName from 'utils/nameHelper';
import './style.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const { TextArea } = Input;
ModalSendAddFriend.propTypes = {
    title: PropTypes.string,
    userAddFriend: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    onClosable: PropTypes.func,
};

ModalSendAddFriend.defaultProps = {
    title: 'Thêm bạn',
    onCancel: null,
    onOk: null,
    onClosable: null,
};

function ModalSendAddFriend({
    title,
    isVisible,
    userAddFriend,
    onCancel,
    onOk,
    onClosable,
}) {
    const { coverPhoto, avatar } = userAddFriend;
    const { user } = useSelector((state) => state.global);

    const [messageInput, setMessageInput] = useState(
        `Xin chào, tôi là ${user.name}`
    );

    // console.log('user', userAddFriend);
    const handleOnCancle = () => {
        if (onCancel) {
            onCancel();
        }
    };
    const handleOnOk = () => {
        if (onOk) {
            onOk({ userAddFriend: userAddFriend.id, messageInput });
            handleOnCancle();
        }
    };
    const handleOnChange = (e) => {
        const value = e.target.value;
        setMessageInput(value);
    };
    const hangleClosable = () => {
        if (onClosable) {
            onClosable();
        }
    };
    return (
        <Modal
            // id="modalStyleSendAddFriend"
            className="modalStyle"
            title={title}
            width={380}
            visible={isVisible}
            okText="Kết bạn"
            cancelText="Thông tin"
            onOk={handleOnOk}
            onCancel={handleOnCancle}
            afterClose={hangleClosable}
        >
            <div id="user-card">
                <div className="user-card_wrapper">
                    <div className="user-card_cover-image">
                        <div className="user-card_cover-photo">
                            {coverPhoto && coverPhoto.url ? (
                                <img src={coverPhoto.url} alt="coverPhoto" />
                            ) : (
                                <Image
                                    src={COVERPHOTO_DEFAULT}
                                    preview={false}
                                    style={UserCardStyle.CoverPhotoStyle}
                                />
                            )}
                        </div>

                        <div className="user-card_avatar">
                            {avatar && avatar.url ? (
                                <Image
                                    fallback={USER_AVATAR_DEFAULT}
                                    src={avatar.url}
                                    style={UserCardStyle.avatarStyle}
                                />
                            ) : (
                                <Avatar
                                    size={96}
                                    style={{
                                        backgroundColor: '#1E90FF',
                                    }}
                                >
                                    <span style={{ fontSize: '3rem' }}>
                                        {getSummaryName(userAddFriend.name)}
                                    </span>
                                </Avatar>
                            )}
                        </div>
                    </div>
                    <div className="user-card-name">{userAddFriend.name}</div>
                    <div className="user-card-message_add-friend">
                        <TextArea
                            showCount
                            maxLength={100}
                            style={{ height: 120 }}
                            onChange={handleOnChange}
                            value={messageInput}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalSendAddFriend;
