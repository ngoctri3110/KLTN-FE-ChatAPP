import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CaretDownOutlined, NumberOutlined } from '@ant-design/icons';
import ChannelItem from '../ChannelItem';
import { Input, message, Modal } from 'antd';
import {
    fetchListMessages,
    getLastViewOfMembers,
    setCurrentChannel,
} from 'features/Chat/slice/chatSlice';
import './style.scss';

import channelApi from 'api/channelApi';

Channel.propTypes = {
    onViewChannel: PropTypes.func,
    channels: PropTypes.array,
    onOpenInfoBlock: PropTypes.func,
};

Channel.defaultProps = {
    onViewChannel: null,
    channels: [],
    onOpenInfoBlock: null,
};
const styleIconDrop = {
    transform: 'rotate(-90deg)',
};

const styleInteract = {
    maxHeight: '0px',
};

function Channel({ onViewChannel, channels, onOpenInfoBlock }) {
    const {
        currentConversation,
        currentChannel,
        conversations,
        totalChannelNotify,
    } = useSelector((state) => state.chat);

    const [isDrop, setIsDrop] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [valueInputName, setValueInputName] = useState('');
    const [valueInputDescrip, setValueInputDescrip] = useState('');
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
            await channelApi.addChannel(
                currentConversation,
                valueInputName,
                valueInputDescrip
            );
            message.success('T???o channel th??nh c??ng');
            setValueInputName('');
            setValueInputDescrip('');
            setIsVisible(false);
        } catch (error) {
            message.error('C?? l???i x???y ra khi t???o channel');
        }
    };

    const handleCancelModal = () => {
        setIsVisible(false);
        setValueInputName('');
        setValueInputDescrip('');
    };

    const handleInputChangeName = (e) => {
        setValueInputName(e.target.value);
    };
    const handleInputChangeDescrip = (e) => {
        setValueInputDescrip(e.target.value);
    };

    const modalStyle = {
        width: '80%',
        margin: '1rem 4rem',
    };

    return (
        <div className="channel">
            <div className="channel-header" onClick={handleOnClick}>
                <div className="channel-header-title">
                    k??nh
                    {totalChannelNotify > 0 && (
                        <span className="total-channel-notify">
                            ({totalChannelNotify} k??nh c?? tin nh???n)
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
                    onClick={handleViewGeneralChannel}
                >
                    <div className="channel-interact-item-icon">
                        <NumberOutlined />
                    </div>
                    <div className="channel-interact-item-text">
                        <span>K??nh chung</span>
                    </div>
                    {numberUnread > 0 && (
                        <div className="notify-item">{numberUnread}</div>
                    )}
                </div>

                {channels.map((channel, index) => {
                    if (index < 3) {
                        return (
                            <ChannelItem
                                key={index}
                                channel={channel}
                                isActive={
                                    currentChannel === channel.id ? true : false
                                }
                            />
                        );
                    }
                })}

                <div className="channel-interact-button">
                    <button onClick={handleAddChannel}>Th??m channel</button>
                </div>
                <div className="channel-interact-button">
                    <button onClick={handleViewAll}>Xem t???t c???</button>
                </div>
            </div>

            <Modal
                title="Th??m Channel"
                visible={isVisible}
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                okText="T???o"
                cancelText="H???y"
                okButtonProps={{ disabled: valueInputName.trim().length === 0 }}
            >
                <Input
                    placeholder="Nh???p t??n channel"
                    allowClear
                    value={valueInputName}
                    onChange={handleInputChangeName}
                    onEnter={handleOkModal}
                    style={modalStyle}
                />

                <Input
                    placeholder="Nh???p m?? t???"
                    allowClear
                    value={valueInputDescrip}
                    onChange={handleInputChangeDescrip}
                    onEnter={handleOkModal}
                    style={modalStyle}
                />
            </Modal>
        </div>
    );
}

export default Channel;
