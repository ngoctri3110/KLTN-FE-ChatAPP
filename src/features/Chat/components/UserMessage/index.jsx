import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { useSelector } from 'react-redux';

UserMessage.propTypes = {
    message: PropTypes.object,
    isMyMessage: PropTypes.bool,
    isSameUser: PropTypes.bool,
    viewUsers: PropTypes.array,
    onOpenModalShare: PropTypes.func,
    onReply: PropTypes.func,
    onMention: PropTypes.func,
};

UserMessage.defaultProps = {
    message: {},
    isMyMessage: false,
    isSameUser: false,
    viewUsers: [],
    onOpenModalShare: null,
    onReply: null,
    onMention: null,
};
function UserMessage({
    message,
    isMyMessage,
    isSameUser,
    viewUsers,
    onOpenModalShare,
    onReply,
    onMention,
}) {
    const {
        id,
        content,
        user,
        createdAt,
        type,
        isDeleted,
        reacts,
        tagUsers,
        replyMessage,
    } = message;
    const { name, avatar } = user;

    const {
        messages,
        currentConversation,
        conversations,
        pinMessages,
        currentChannel,
    } = useSelector((state) => state.chat);

    const global = useSelector((state) => state.global);

    return <div>UserMessage</div>;
}

export default UserMessage;
