import React, { useEffect, useState } from 'react';
import ConversationAvatar from '../ConversationAvatar';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DeleteFilled, MoreOutlined, TagFilled } from '@ant-design/icons';
import ShortMessage from '../ShortMessage';
import classifyUtils from 'utils/classifyUtils';
import dateUtils from 'utils/dateUtils';
import './style.scss';
import { Button, Dropdown, Menu } from 'antd';
import SubMenuClassify from 'components/SubMenuClassify';

ConversationSingle.propTypes = {
    conversation: PropTypes.object,
    onClick: PropTypes.func,
};
function ConversationSingle({ conversation, onClick }) {
    const {
        id,
        name,
        avatar,
        numberUnread,
        lastMessage,
        members,
        totalMembers,
    } = conversation;
    const { type, createdAt } = lastMessage;
    const { conversations, classifies } = useSelector((state) => state.chat);
    const [classify, setClassify] = useState(null);

    useEffect(() => {
        if (classifies.length > 0) {
            const temp = classifyUtils.getClassifyOfObject(id, classifies);
            if (temp) {
                setClassify(temp);
            }
        }
        // eslint-disable-next-line
    }, [conversation, conversations, classifies]);
    // console.log('members', members);

    const handleClick = () => {
        if (onClick) onClick(id);
    };
    return (
        <div className="conversation-item_box" onClick={handleClick}>
            <div className="left-side-box">
                <div className="icon-users">
                    <ConversationAvatar
                        members={members}
                        totalMembers={totalMembers}
                        avatar={avatar?.url}
                        type={conversation.type}
                        name={name}
                    />
                </div>
            </div>
            {lastMessage ? (
                <>
                    <div className="middle-side-box">
                        <span className="name-box">{name}</span>
                        <div className="lastest-message">
                            {classify && (
                                <span className="tag-classify">
                                    <TagFilled
                                        style={{
                                            color: `${classify.color?.code}`,
                                        }}
                                    />
                                </span>
                            )}

                            <ShortMessage message={lastMessage} type={type} />
                        </div>
                    </div>

                    <div className="right-side-box">
                        <span className="lastest-time">
                            {dateUtils.toTime(createdAt)}
                        </span>

                        <span className="message-count">{numberUnread}</span>
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    );
}

export default ConversationSingle;
