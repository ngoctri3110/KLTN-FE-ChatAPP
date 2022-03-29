import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Scrollbars from 'react-custom-scrollbars';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import UserMessage from 'features/Chat/components/UserMessage';
import DividerCustom from 'features/Chat/components/DividerCustom';

BodyChatContainer.propTypes = {
    scrollId: PropTypes.string,
    onSCrollDown: PropTypes.string,
    onBackToBottom: PropTypes.func,
    onLoading: PropTypes.func,
    onReply: PropTypes.func,
    onMention: PropTypes.func,
};

BodyChatContainer.defaultProps = {
    scrollId: '',
    onSCrollDown: '',
    onBackToBottom: null,
    onLoading: null,
    onReply: null,
    onMention: null,
};

function BodyChatContainer(
    scrollId,
    onSCrollDown,
    onBackToBottom,
    onResetScrollButton,
    turnOnScrollButoon,
    onReply,
    onMention
) {
    const { user } = useSelector((state) => state.global);

    const {
        messages,
        currentConversation,
        currentPage,
        lastViewOfMember,
        currentChannel,
    } = useSelector((state) => state.chat);

    const [loading, setLoading] = useState(false);

    const scrollbars = useRef();
    const dispatch = useDispatch();

    const handleOnScrolling = () => {};
    const handleOnStop = () => {};
    const handleOpenModalShare = () => {};

    console.log('57, message', messages);

    const renderMessages = (messages) => {
        const result = [];

        for (let i = 0; i < messages.length; i++) {
            const preMessage = messages[i - 1];
            const currentMessage = messages[i];

            const senderId = currentMessage.user.id;
            const isMyMessage = senderId === user.id ? true : false;

            // chổ này có thể sai
            if (i === 0) {
                result.push(
                    <UserMessage
                        key={i}
                        message={currentMessage}
                        isMyMessage={isMyMessage}
                        conditionTime={true}
                        onOpenModalShare={handleOpenModalShare}
                        onReply={onReply}
                        onMention={onMention}
                    />
                );
                continue;
            }
            const dateTempt2 = new Date(currentMessage.createdAt);
            const dateTempt1 = new Date(preMessage.createdAt);

            const isSameUser =
                currentMessage.user.id === preMessage.user.id &&
                preMessage.type !== 'NOTIFY'
                    ? true
                    : false;

            const timeIsEqual =
                dateTempt2.setHours(dateTempt2.getHours() - 6) > dateTempt1
                    ? true
                    : false;

            // let conditionTime = false
            // if (isSameUser) {
            //     if (indexMesssageBreak.current === i) {
            //         conditionTime = true;
            //     }

            //     if (i === messages.length - 1) {
            //         conditionTime = true;
            //     }
            //     indexMesssageBreak.current = i
            // } else {
            //     if (indexMesssageBreak.current === i) {
            //         conditionTime = true;
            //     }

            //     if (i === messages.length - 1) {
            //         conditionTime = true;
            //     }

            // }

            // tin nhắn cuối
            const viewUsers = [];
            if (i == messages.length - 1) {
                const lastViewNotMe = lastViewOfMember.filter((ele) => {
                    if (
                        ele.user.id == messages[i].user.id ||
                        ele.user.id == user.id
                    )
                        return false;

                    return true;
                });

                lastViewNotMe.forEach((ele) => {
                    const { lastView, user } = ele;

                    if (new Date(lastView) >= new Date(messages[i].createdAt))
                        viewUsers.push(user);
                });
            }

            if (timeIsEqual) {
                result.push(
                    <div key={i}>
                        <DividerCustom dateString={dateTempt2} />
                        <UserMessage
                            key={i}
                            message={currentMessage}
                            isMyMessage={isMyMessage}
                            viewUsers={viewUsers}
                            onOpenModalShare={handleOpenModalShare}
                            onReply={onReply}
                            onMention={onMention}
                        />
                    </div>
                );
            } else
                result.push(
                    <UserMessage
                        key={i}
                        message={currentMessage}
                        isMyMessage={isMyMessage}
                        isSameUser={isSameUser}
                        viewUsers={viewUsers}
                        onOpenModalShare={handleOpenModalShare}
                        onReply={onReply}
                        onMention={onMention}
                    />
                );
        }

        return result;
    };

    return (
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            ref={scrollbars}
            onScrollFrame={handleOnScrolling}
            onScrollStop={handleOnStop}
        >
            {/* <div className='main-body-conversation'> */}

            <div className="spinning-custom">
                <Spin spinning={loading} />
            </div>

            {renderMessages(messages)}

            {/* <button onClick={() => {
            document.getElementById('613dddc02f1e724484d09d82').scrollIntoView();
        }}>
            nust test
        </button> */}

            {/* </div>  */}

            {/* <ModalShareMessage
                visible={visibleModalShare}
                onCancel={() => setVisibleModalShare(false)}
                idMessage={idMessageShare}
            /> */}
        </Scrollbars>
    );
}

export default BodyChatContainer;
