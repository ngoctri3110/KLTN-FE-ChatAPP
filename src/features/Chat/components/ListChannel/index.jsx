import { NumberOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import ChannelItem from '../ChannelItem';

const ListChannel = ({ data }) => {
    const { currentChannel, currentConversation, conversations } = useSelector(
        (state) => state.chat
    );

    const handleViewGeneralChannel = () => {};
    return (
        <div className="list-channel">
            <div
                className={`channel-interact-amount ${
                    currentChannel ? '' : 'active'
                }`}
                onClick={handleViewGeneralChannel}
            >
                <div className="channel-interact-amount-icon">
                    <NumberOutlined />
                </div>
                <div className="channel-interact-amount-text">
                    <span>Kênh chung</span>
                </div>
                {conversations.find((ele) => ele.id === currentConversation)
                    .numberUnread > 0 && (
                    <div className="notify-amount">
                        {
                            conversations.find(
                                (ele) => ele.id === currentConversation
                            ).numberUnread
                        }
                    </div>
                )}
            </div>
            {data.map((ele, index) => (
                <ChannelItem
                    data={ele}
                    isActive={currentChannel === ele.id ? true : false}
                />
            ))}
        </div>
    );
};

export default ListChannel;
