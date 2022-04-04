import {
    CaretDownOutlined,
    DeleteOutlined,
    ExportOutlined,
} from '@ant-design/icons';
import { message, Modal } from 'antd';
import conversationApi from 'api/conversationApi';
import { leaveGroup } from 'features/Chat/slice/chatSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

const styleIconDrop = {
    transform: 'rotate(-90deg)',
};

const styleInteract = {
    maxHeight: '0px',
};

const OtherSettings = () => {
    const { user } = useSelector((state) => state.global);
    const { currentConversation, conversations } = useSelector(
        (state) => state.chat
    );
    const [isDrop, setIsDrop] = useState(false);
    const dispatch = useDispatch();

    const findLeader =
        conversations.find((ele) => ele.id === currentConversation).leaderId ===
        user.id;

    const typeConver =
        conversations.find((ele) => ele.id === currentConversation).type ===
        'GROUP';

    console.log(
        'type conver',
        conversations.find((ele) => ele.id === currentConversation).type ===
            'GROUP'
    );

    const handleOnClick = () => {
        setIsDrop(!isDrop);
    };

    function confirmDeleteGroup() {
        Modal.confirm({
            title: 'Xác nhận',
            content: (
                <span>
                    Toàn bộ nội dung cuộc trò chuyện sẽ bị xóa vĩnh viễn, bạn có
                    chắc chắn muốn giải tán nhóm?
                </span>
            ),
            okText: 'Giải tán',
            cancelText: 'Không',
            onOk: async () => {
                try {
                    await conversationApi.deleteConversation(
                        currentConversation
                    );
                    message.success('Xóa thành công');
                } catch (error) {
                    message.error('Đã có lỗi xảy ra');
                }
            },
        });
    }

    function confirm() {
        Modal.confirm({
            title: 'Cảnh báo',
            content: 'Bạn có thực sự muốn rời khỏi nhóm',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await conversationApi.leaveGroup(currentConversation);
                    dispatch(leaveGroup(currentConversation));
                    message.success(`Rời nhóm thành công`);
                } catch (error) {
                    message.error(`Rời nhóm thất bại`);
                }
            },
        });
    }

    function confirmDeleteMessage() {
        Modal.confirm({
            title: 'Xác nhận',
            content: (
                <span>
                    Toàn bộ nội dung trò chuyện sẽ bị xóa vĩnh viễn, bạn có chắc
                    chắn muốn xóa?
                </span>
            ),
            okText: 'Xóa',
            cancelText: 'Không',
            onOk: async () => {
                try {
                    await conversationApi.deleteAllMessage(currentConversation);
                    message.success('Xóa thành công');
                } catch (error) {
                    message.error('Đã có lỗi xảy ra');
                }
            },
        });
    }
    return (
        <div className="info_setting">
            <div className="info_setting-header" onClick={handleOnClick}>
                <div className="info_setting-header-title">
                    Thiết lập bảo mật
                </div>

                <div
                    className="info_setting-header-icon"
                    style={isDrop ? {} : styleIconDrop}
                >
                    <CaretDownOutlined />
                </div>
            </div>
            <div
                className="info_setting-interact"
                style={isDrop ? {} : styleInteract}
            >
                {typeConver ? (
                    findLeader ? (
                        <div
                            className="info_setting-interact-item danger"
                            onClick={confirmDeleteGroup}
                        >
                            <div className="info_setting-interact-item-icon">
                                <DeleteOutlined />
                            </div>

                            <div className="info_setting-interact-item-text">
                                <span>Giải tán nhóm</span>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="info_setting-interact-item danger"
                            onClick={confirm}
                        >
                            <div className="info_setting-interact-item-icon">
                                <ExportOutlined />
                            </div>

                            <div className="info_setting-interact-item-text">
                                <span>Rời nhóm</span>
                            </div>
                        </div>
                    )
                ) : (
                    <div
                        className="info_setting-interact-item danger"
                        onClick={confirmDeleteMessage}
                    >
                        <div className="info_setting-interact-item-icon">
                            <DeleteOutlined />
                        </div>

                        <div className="info_setting-interact-item-text">
                            <span>Xóa lịch sử trò chuyện</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OtherSettings;
