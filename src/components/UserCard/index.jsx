import { Avatar, Image } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import COVERPHOTO_DEFAULT from 'assets/images/user/talo_coverPhoto_default.png';
import './style.scss';
import USER_AVATAR_DEFAULT from 'assets/images/user/talo_user_default.jpg';
import UserCardStyle from './UserCardStyle';
import getSummaryName from 'utils/nameHelper';

UserCard.propTypes = {
    title: PropTypes.string,
    user: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
};

UserCard.defaultProps = {
    title: 'Thông tin',
    onCancel: null,
};

function UserCard({ title, isVisible, user, onCancel }) {
    const handleOnCancle = () => {
        if (onCancel) {
            onCancel();
        }
    };
    console.log(user);
    return (
        <Modal
            title={title}
            width={400}
            visible={isVisible}
            footer={null}
            onCancel={handleOnCancle}
        >
            <div id="user-card">
                <div className="user-card_wrapper">
                    <div className="user-card_cover-image">
                        <div className="user-card_cover-photo">
                            {user.coverPhoto && user.coverPhoto.url ? (
                                <img src={user.coverPhoto.url} alt="" />
                            ) : (
                                <Image
                                    src={COVERPHOTO_DEFAULT}
                                    preview={false}
                                    style={UserCardStyle.CoverImageStyle}
                                />
                            )}
                        </div>

                        <div className="user-card_avatar">
                            {user.avatar && user.avatar.url ? (
                                <Image
                                    fallback={USER_AVATAR_DEFAULT}
                                    src={user.avatar.url}
                                    style={UserCardStyle.avatarStyle}
                                />
                            ) : (
                                <Avatar
                                    size={96}
                                    style={{
                                        backgroundColor: user.avatarColor,
                                    }}
                                >
                                    <span style={{ fontSize: '3rem' }}>
                                        {getSummaryName(user.name)}
                                    </span>
                                </Avatar>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default UserCard;
