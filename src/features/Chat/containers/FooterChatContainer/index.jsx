import { LikeOutlined, SendOutlined } from '@ant-design/icons';
import { Mentions } from 'antd';
import { Option } from 'antd/lib/mentions';
import NavigationChatBox from 'features/Chat/components/NavigationChatBox';
import React from 'react';

import './style.scss';
function FooterChatContainer() {
    return (
        <div id="main-footer-chat">
            <div className="navigation">
                <NavigationChatBox />
            </div>
            <div className="chat-editor">
                <div className="main-editor">
                    <Mentions
                        autoSize={{ minRows: 1, maxRows: 5 }}
                        placeholder={`Nhập @, tin nhắt tới ...`}
                        size="large"
                        bordered={false}
                        style={{
                            whiteSpace: 'pre-wrap',
                            border: 'none',
                            outline: 'none',
                        }}
                        spellCheck={false}
                        split=" "
                    >
                        <Option value="afc163">afc163</Option>
                        <Option value="zombieJ">zombieJ</Option>
                        <Option value="yesmeck">yesmeck</Option>
                    </Mentions>
                </div>
                <div className="addtion-interaction">
                    <div className="like-emoji">
                        <div className="send-text-thumb">
                            <LikeOutlined />
                        </div>
                    </div>
                    <div className="like-emoji">
                        <div className="send-text-thumb">
                            <SendOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterChatContainer;
