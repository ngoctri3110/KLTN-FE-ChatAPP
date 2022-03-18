import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { UserAddOutlined } from '@ant-design/icons';

ShortMessage.propTypes = {
    message: PropTypes.object,
    type: PropTypes.bool,
};

ShortMessage.defaultProps = {
    message: {},
    type: PropTypes.bool,
};

function ShortMessage({ message, type }) {
    const { user } = useSelector((state) => state.global);
    const { content, isDeleted } = message;

    const renderName = () => {
        if (type) {
            if (message.user._id === user._id) {
                return 'Bạn: ';
            } else {
                return message.user.name + ': ';
            }
        } else {
            if (message.user._id === user._id) {
                return 'Bạn: ';
            } else {
                return '';
            }
        }
    };

    return (
        <>
            {isDeleted ? (
                <span>{renderName()} đã thu hồi một tin nhắn</span>
            ) : (
                <>
                    {message.type === 'TEXT' && (
                        <span>
                            {renderName()}
                            {content}
                        </span>
                    )}
                    {message.type === 'NOTIFY' &&
                        message.content === 'Đã thêm vào nhóm' && (
                            <span>
                                {renderName()}
                                <UserAddOutlined />
                                &nbsp;đã thêm thành viên vào nhóm
                            </span>
                        )}
                </>
            )}
        </>
    );
}

export default ShortMessage;
