import React, { useState } from 'react';

import PropTypes from 'prop-types';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CaretDownOutlined, NumberOutlined } from '@ant-design/icons';
import ChannelItem from '../ChannelItem';
import { Input, message, Modal } from 'antd';
import {
    fetchListMessages,
    getLastViewOfMembers,
    setCurrentChannel,
} from 'features/Chat/slice/chatSlice';
import channelApi from 'api/channelApi';

Channel.propTypes = {
    onViewChannel: PropTypes.func,
    data: PropTypes.array,
    onOpenInfoBlock: PropTypes.func,
};

Channel.defaultProps = {
    onViewChannel: null,
    data: [],
    onOpenInfoBlock: null,
};
const styleIconDrop = {
    transform: 'rotate(-90deg)',
};

const styleInteract = {
    maxHeight: '0px',
};

function Channel({ onViewChannel, data, onOpenInfoBlock }) {
    const {
        currentConversation,
        currentChannel,
        conversations,
        totalChannelNotify,
    } = useSelector((state) => state.chat);

    const [isDrop, setIsDrop] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const dispatch = useDispatch();

    const numberUnread = conversations.find(
        (ele) => ele.id === currentConversation
    ).numberUnread;

    const handleOnClick = () => {
        setIsDrop(!isDrop);
    };

    const handleViewGeneralChannel = () => {
        dispatch(setCurrentChannel(''));
        dispatch(
            fetchListMessages({ conversationId: currentConversation, size: 10 })
        );
        dispatch(getLastViewOfMembers({ conversationId: currentConversation }));
    };

    const handleAddChannel = () => {
        setIsVisible(true);
    };

    const handleViewAll = () => {
        if (onViewChannel) {
            onViewChannel();
        }
        if (onOpenInfoBlock) {
            onOpenInfoBlock();
        }
    };

    const handleOkModal = async () => {
        try {
            await channelApi.addChannel(currentConversation, valueInput);
            message.success('Tạo channel thành công');
            setIsVisible(false);
        } catch (error) {
            message.error('Có lỗi xảy ra khi tạo channel');
        }
    };

    const handleCancelModal = () => {
        setIsVisible(false);
        setValueInput('');
    };

    const handleInputChange = (e) => {
        setValueInput(e.target.value);
    };
    return (
        <div className="channel">
            <div className="channel-header" onClick={handleOnClick}>
                <div className="channel-header-title">
                    kênh
                    {totalChannelNotify > 0 && (
                        <span className="total-channel-notify">
                            ({totalChannelNotify} kênh có tin nhắn)
                        </span>
                    )}
                </div>
                <div
                    className="channel-header-icon"
                    style={isDrop ? {} : styleIconDrop}
                >
                    <CaretDownOutlined />
                </div>
            </div>

            <div
                className="channel-interact"
                style={isDrop ? {} : styleInteract}
            >
                <div
                    className={`channel-interact-item ${
                        currentChannel ? '' : 'active'
                    }`}
                    onclick={handleViewGeneralChannel}
                >
                    <div className="channel-interact-item-icon">
                        <NumberOutlined />
                    </div>
                    <div className="channel-interact-item-text">
                        <span>Kênh chung</span>
                    </div>
                    {numberUnread > 0 && (
                        <div className="notify-item">{numberUnread}</div>
                    )}
                </div>

                {data.map((ele, index) => {
                    if (index < 3) {
                        return (
                            <ChannelItem
                                key={index}
                                data={ele}
                                isActive={
                                    currentChannel === ele.id ? true : false
                                }
                            />
                        );
                    }
                })}

                <div className="channel-interact-button">
                    <button onClick={handleAddChannel}>Thêm Channel</button>
                </div>

                <div className="channel-interact-button">
                    <button onClick={handleViewAll}>Xem Tất cả</button>
                </div>
            </div>

            <Modal
                title="Thêm Channel"
                visible={isVisible}
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                okText="Tạo"
                cancelText="Hủy"
                okButtonProps={{ disabled: valueInput.trim().length === 0 }}
            >
                <Input
                    placeholder="Nhập tên channel"
                    allowClear
                    value={valueInput}
                    onChange={handleInputChange}
                    onEnter={handleOkModal}
                />
            </Modal>
        </div>
    );
}

export default Channel;
