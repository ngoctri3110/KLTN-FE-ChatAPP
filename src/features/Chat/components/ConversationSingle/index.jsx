import React from 'react';
import ConversationAvatar from '../ConversationAvatar';
import './style.scss';

const ConversationSingle = () => {
    return (
        <div className="conversation-item_box">
            <div className="left-side-box">
                <div className="icon-users">
                    <ConversationAvatar />
                </div>
            </div>
        </div>
    );
};

export default ConversationSingle;
