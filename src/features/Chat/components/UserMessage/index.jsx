import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import PersonalIcon from '../PersonalIcon';
import { useState } from 'react';
import TextMessage from '../MessageType/TextMessage';
import './style.scss';
import ImageMessage from '../MessageType/ImageMessage';
import VideoMessage from '../MessageType/VideoMessage';
import StickerMessage from '../MessageType/StickerMessage';
import FileMessage from '../MessageType/FileMessage';
import HTMLMessage from '../MessageType/HTMLMessage';
import LastView from '../LastView';
import NotifyMessage from '../MessageType/NotifyMessage';
import PollMessage from '../MessageType/PollMessage';
import { checkLeader } from 'utils/groupUtils';
import messageApi from 'api/messageApi';
import ListReaction from '../ListReaction';
import ListReactionOfUser from '../ListReactionOfUser';

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
    const {
        messages,
        currentConversation,
        conversations,
        pinMessages,
        currentChannel,
    } = useSelector((state) => state.chat);

    const global = useSelector((state) => state.global);

    const [isLeader, setIsLeader] = useState(false);
    const dispatch = useDispatch();

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

    //react
    const [listReactionCurrent, setListReactionCurrent] = useState([]);

    // cần chỉnh sửa......................
    const myReact =
        reacts &&
        reacts.length > 0 &&
        reacts.find((ele) => ele.userId.id === global.user.id);

    const dateAt = new Date(createdAt);

    const listReaction = ['👍', '❤️', '😆', '😮', '😭', '😡', '👎'];

    const transferValueToText = (value) => {
        if (value === 1) {
            return 'LIKE';
        }
        if (value === 2) {
            return 'HEART';
        }
        if (value === 3) {
            return 'LAUGH';
        }
        if (value === 4) {
            return 'WOW';
        }
        if (value === 5) {
            return 'SAD';
        }
        if (value === 6) {
            return 'ANGRY';
        }
        if (value === 7) {
            return 'DISLIKE';
        }
    };

    const transferTextToValue = (text) => {
        if (text === 'LIKE') {
            return 1;
        }
        if (text === 'HEART') {
            return 2;
        }
        if (text === 'LAUGH') {
            return 3;
        }
        if (text === 'WOW') {
            return 4;
        }
        if (text === 'SAD') {
            return 5;
        }
        if (text === 'ANGRY') {
            return 6;
        }
        if (text === 'DISLIKE') {
            return 7;
        }
    };

    useEffect(() => {
        setIsLeader(checkLeader(user.id, conversations, currentConversation));
        //eslint-disable-next-line
    }, [messages]);

    useEffect(() => {
        let temp = [];
        if (reacts && reacts.length > 0) {
            reacts.forEach((ele) => {
                if (!temp.includes(ele.type)) {
                    temp.push(ele.type);
                }
            });
        }
        setListReactionCurrent(temp);

        //eslint-disable-next-line
    }, [message]);

    const transferIcon = (type) => {
        return listReaction[parseInt(transferTextToValue(type)) - 1];
    };

    const handleClickLike = () => {
        sendReaction('LIKE');
    };
    const handleClickReaction = (value) => {
        const type = listReaction.findIndex((ele) => ele === value) + 1;
        sendReaction(transferValueToText(type));
    };

    const sendReaction = async (type) => {
        await messageApi.expressionReaction(id, type);
    };

    return (
        <>
            {!isDeleted && type === 'NOTIFY' ? (
                <>
                    <NotifyMessage message={message} />
                    <div className="last-view-avatar center">
                        {viewUsers && viewUsers.length > 0 && (
                            <LastView lastView={viewUsers} />
                        )}
                    </div>
                </>
            ) : (
                <>
                    {type === 'VOTE' && <PollMessage data={message} />}

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
                                                            >
                                                                {!myReact && (
                                                                    <ListReaction
                                                                        isMyMessage={
                                                                            isMyMessage
                                                                        }
                                                                        onClickLike={
                                                                            handleClickLike
                                                                        }
                                                                        listReaction={
                                                                            listReaction
                                                                        }
                                                                        onClickReaction={
                                                                            handleClickReaction
                                                                        }
                                                                    />
                                                                )}
                                                            </TextMessage>
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
                                                            >
                                                                {type ===
                                                                    'IMAGE' &&
                                                                    !myReact && (
                                                                        <ListReaction
                                                                            type="media"
                                                                            isMyMessage={
                                                                                isMyMessage
                                                                            }
                                                                            onClickLike={
                                                                                handleClickLike
                                                                            }
                                                                            listReaction={
                                                                                listReaction
                                                                            }
                                                                            onClickReaction={
                                                                                handleClickReaction
                                                                            }
                                                                        />
                                                                    )}
                                                            </ImageMessage>
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
                                                            >
                                                                {!myReact && (
                                                                    <ListReaction
                                                                        type="media"
                                                                        isMyMessage={
                                                                            isMyMessage
                                                                        }
                                                                        onClickLike={
                                                                            handleClickLike
                                                                        }
                                                                        listReaction={
                                                                            listReaction
                                                                        }
                                                                        onClickReaction={
                                                                            handleClickReaction
                                                                        }
                                                                    />
                                                                )}
                                                            </VideoMessage>
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
                                                            >
                                                                {!myReact && (
                                                                    <ListReaction
                                                                        type="media"
                                                                        isMyMessage={
                                                                            isMyMessage
                                                                        }
                                                                        onClickLike={
                                                                            handleClickLike
                                                                        }
                                                                        listReaction={
                                                                            listReaction
                                                                        }
                                                                        onClickReaction={
                                                                            handleClickReaction
                                                                        }
                                                                    />
                                                                )}
                                                            </FileMessage>
                                                        ) : type === 'HTML' ? (
                                                            <HTMLMessage
                                                                content={
                                                                    content
                                                                }
                                                                dateAt={dateAt}
                                                                isSeen={
                                                                    viewUsers &&
                                                                    viewUsers.length >
                                                                        0
                                                                }
                                                            ></HTMLMessage>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            <div
                                                className={`reacted-block ${
                                                    type === 'IMAGE' ||
                                                    type === 'VIDEO'
                                                        ? 'media'
                                                        : ''
                                                }
                                                ${
                                                    isMyMessage
                                                        ? 'left'
                                                        : 'right'
                                                }`}
                                            >
                                                {listReactionCurrent.length >
                                                    0 &&
                                                    !isDeleted && (
                                                        <ListReactionOfUser
                                                            listReactionCurrent={
                                                                listReactionCurrent
                                                            }
                                                            reacts={reacts}
                                                            isMyMessage={
                                                                isMyMessage
                                                            }
                                                            onTransferIcon={
                                                                transferIcon
                                                            }
                                                        />
                                                    )}

                                                {myReact && !isDeleted && (
                                                    <div
                                                        className={`your-react ${
                                                            isMyMessage
                                                                ? 'bg-white'
                                                                : ''
                                                        }`}
                                                    >
                                                        <span className="react-current">
                                                            {myReact
                                                                ? transferIcon(
                                                                      myReact.type
                                                                  )
                                                                : ''}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`last-view-avatar  ${
                                isMyMessage ? 'reverse' : ''
                            } `}
                        >
                            {viewUsers && viewUsers.length > 0 && (
                                <LastView lastView={viewUsers} />
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default UserMessage;
