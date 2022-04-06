import { NumberOutlined } from '@ant-design/icons';
import {
    fetchListMessages,
    getLastViewOfMembers,
    setCurrentChannel,
} from 'features/Chat/slice/chatSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelItem from '../ChannelItem';

const ListChannel = ({ data }) => {
    const { currentChannel, currentConversation, conversations } = useSelector(
        (state) => state.chat
    );
    const dispatch = useDispatch();

    const handleViewGeneralChannel = () => {
        dispatch(setCurrentChannel(''));
        dispatch(
            fetchListMessages({ conversationId: currentConversation, size: 10 })
        );
        dispatch(getLastViewOfMembers({ conversationId: currentConversation }));
    };
    return (
        <div className="channel">
            <div
                className={`channel-interact-item ${
                    currentChannel ? '' : 'active'
                }`}
                onClick={handleViewGeneralChannel}
            >
                <div className="channel-interact-item-icon">
                    <NumberOutlined />
                </div>
                <div className="channel-interact-item-text">
                    <span>Kênh chung</span>
                </div>
                {conversations.find((ele) => ele.id === currentConversation)
                    .numberUnread > 0 && (
                    <div className="notify-item">
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
