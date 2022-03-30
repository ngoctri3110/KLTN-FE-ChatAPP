import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import PersonalIcon from '../PersonalIcon';
import { useState } from 'react';
import TextMessage from '../TextMessage';
import './style.scss';
import ImageMessage from '../ImageMessage';
import VideoMessage from '../VideoMessage';
import StickerMessage from '../StickerMessage';
import FileMessage from '../FileMessage';

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
        tags,
        replyMessage,
    } = message;
    const { name, avatar } = user;
    console.log('50.userMessage', user);
    const {
        messages,
        currentConversation,
        conversations,
        pinMessages,
        currentChannel,
    } = useSelector((state) => state.chat);

    const global = useSelector((state) => state.global);
    const [isLeader, setIsLeader] = useState(false);

    const setMarginTopAndBottom = (id) => {
        const index = messages.findIndex((message) => message.id === id);

        if (index === 0) {
            return 'top';
        }
        if (index === messages.length - 1) {
            return 'bottom';
        }
        return '';
    };

    const myReact =
        reacts &&
        reacts.length > 0 &&
        reacts.find((ele) => ele.user.id === global.user.id);

    const dateAt = new Date(createdAt);
    return (
        <>
            {!isDeleted && type === 'NOTIFY' ? (
                <>
                    {/* <NotifyMessage message={message} /> */}
                    <div className="last-view-avatar center">
                        {/* {viewUsers && viewUsers.length > 0 && (
                            <LastView lastView={viewUsers} />
                        )} */}
                        Thong bao
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={`${setMarginTopAndBottom(id)} user-message ${
                            type === 'VOTE' ? 'hidden' : ''
                        }`}
                    >
                        <div
                            className={`interact-conversation ${
                                isMyMessage ? 'reverse' : ''
                            } `}
                        >
                            <div
                                className={`avatar-user ${
                                    isSameUser ? 'hidden' : ''
                                }`}
                            >
                                <PersonalIcon
                                    isHost={isLeader}
                                    demention={40}
                                    avatar={avatar?.url}
                                    name={name}
                                />
                            </div>
                            <div className="list-conversation">
                                <div className="message" id={`${id}`}>
                                    <div
                                        className={`sub-message ${
                                            isMyMessage ? 'reverse' : ''
                                        }
                                    ${isSameUser ? 'same-user' : ''}`}
                                    >
                                        <div
                                            className={`content-message ${
                                                type === 'IMAGE' ||
                                                type === 'VIDEO' ||
                                                type === 'STICKER'
                                                    ? 'content-media'
                                                    : ''
                                            }
                                            ${
                                                isMyMessage &&
                                                type !== 'IMAGE' &&
                                                type !== 'VIDEO' &&
                                                type !== 'STICKER'
                                                    ? 'my-message-bg'
                                                    : ''
                                            }
                                            `}
                                        >
                                            <span className="author-message">
                                                {isSameUser && isMyMessage
                                                    ? ''
                                                    : isSameUser && !isMyMessage
                                                    ? ''
                                                    : !isSameUser && isMyMessage
                                                    ? ''
                                                    : name}
                                            </span>
                                            <div className="content-message-description">
                                                {isDeleted ? (
                                                    <span className="undo-message">
                                                        {' '}
                                                        Tin nhắn đã được thu hồi
                                                    </span>
                                                ) : (
                                                    <>
                                                        {type === 'TEXT' ? (
                                                            <TextMessage
                                                                tags={tags}
                                                                content={
                                                                    content
                                                                }
                                                                dateAt={dateAt}
                                                                isSeen={
                                                                    viewUsers &&
                                                                    viewUsers.length >
                                                                        0
                                                                }
                                                                replyMessage={
                                                                    replyMessage
                                                                }
                                                            ></TextMessage>
                                                        ) : type === 'IMAGE' ? (
                                                            <ImageMessage
                                                                content={
                                                                    content
                                                                }
                                                                dateAt={dateAt}
                                                                isSeen={
                                                                    viewUsers &&
                                                                    viewUsers.length >
                                                                        0
                                                                }
                                                            ></ImageMessage>
                                                        ) : type === 'VIDEO' ? (
                                                            <VideoMessage
                                                                content={
                                                                    content
                                                                }
                                                                dateAt={dateAt}
                                                                isSeen={
                                                                    viewUsers &&
                                                                    viewUsers.length >
                                                                        0
                                                                }
                                                            ></VideoMessage>
                                                        ) : type ===
                                                          'STICKER' ? (
                                                            <StickerMessage
                                                                content={
                                                                    content
                                                                }
                                                                dateAt={dateAt}
                                                                isSeen={
                                                                    viewUsers &&
                                                                    viewUsers.length >
                                                                        0
                                                                }
                                                            />
                                                        ) : type === 'FILE' ? (
                                                            <FileMessage
                                                                content={
                                                                    content
                                                                }
                                                                dateAt={dateAt}
                                                                isSeen={
                                                                    viewUsers &&
                                                                    viewUsers.length >
                                                                        0
                                                                }
                                                            ></FileMessage>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default UserMessage;
