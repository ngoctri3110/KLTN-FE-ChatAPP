import { Modal } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

ModalSendAddFriend.propTypes = {
    title: PropTypes.string,
    user: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
};

ModalSendAddFriend.defaultProps = {
    title: 'Thông tin',
    onCancel: null,
};

function ModalSendAddFriend({ title, isVisible, user, onCancel }) {
    const handleOnCancle = () => {
        if (onCancel) {
            onCancel();
        }
    };
    return (
        <Modal
            className="modalStyle"
            title={title}
            width={380}
            visible={isVisible}
            footer={null}
            onCancel={handleOnCancle}
        >
            Modal add Friend
        </Modal>
    );
}

export default ModalSendAddFriend;
