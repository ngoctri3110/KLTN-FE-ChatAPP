import Icon, {
    DashOutlined,
    FileImageOutlined,
    FontColorsOutlined,
    LinkOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
import { Button, Dropdown, Menu, Popover } from 'antd';
import React from 'react';
import { BsNewspaper } from 'react-icons/bs';
import { FcBarChart } from 'react-icons/fc';

import './style.scss';

const styleButton = {
    background: 'none',
    outline: 'none',
    border: 'red',
    padding: '0px',
    borderRadius: '50%',
    fontSize: '2.2rem',
};

function NavigationChatBox() {
    const menu = (
        <Menu>
            <Menu.Item key="VOTE" icon={<FcBarChart />}>
                <span className="item-menu-vote">Tạo cuộc bình chọn</span>
            </Menu.Item>
            <Menu.Item key="VIEW_NEWS" icon={<BsNewspaper />}>
                <span className="item-menu-vote"> Xem bảng tin nhóm</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div id="navigation-chat-box">
            <ul>
                <Popover
                    content={'Đây là nơi chứ sticker'}
                    trigger="click"
                    placement="topLeft"
                >
                    <li className="item-chat-box">
                        <div title="Gửi sticker">
                            <SmileOutlined />
                        </div>
                    </li>
                </Popover>
                <li className="item-chat-box">
                    <Button
                        title="Gửi hình ảnh"
                        type="text"
                        style={styleButton}
                    >
                        <FileImageOutlined />
                    </Button>
                </li>

                <li className="item-chat-box">
                    <Button title="Gửi file" type="text" style={styleButton}>
                        <LinkOutlined />
                    </Button>
                </li>
                <li className="item-chat-box">
                    <div title="Định dạng tin nhắn">
                        <FontColorsOutlined />
                    </div>
                </li>
                <li className="item-chat-box">
                    <Dropdown
                        overlay={menu}
                        placement="topLeft"
                        trigger={['click']}
                        arrow
                    >
                        <Button title="Vote" type="text" style={styleButton}>
                            <DashOutlined />
                        </Button>
                    </Dropdown>
                </li>
            </ul>
        </div>
    );
}

export default NavigationChatBox;
