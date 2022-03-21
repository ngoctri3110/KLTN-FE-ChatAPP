// import ConversationSingle from 'features/Chat/components/ConversationSingle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';
import { Dropdown, Menu } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import ConversationSingle from 'features/Chat/components/ConversationSingle';
import SubMenuClassify from 'components/SubMenuClassify';

ConversationContainer.propTypes = {
    valueClassify: PropTypes.string.isRequired,
};

ConversationContainer.defaultProps = {
    valueClassify: '',
};
function ConversationContainer({ valueClassify }) {
    const { user } = useSelector((state) => state.global);
    const { conversations, classifies } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    const tempClassify =
        classifies.find((ele) => ele.id === valueClassify) || 0;

    const checkConverInClassify = (idMember) => {
        if (tempClassify === 0) return true;
        const index = tempClassify.conversationIds.findIndex(
            (ele) => ele === idMember
        );
        return index > -1;
    };

    const converFilter = [...conversations].filter((ele) => {
        if (checkConverInClassify(ele.id)) return true;
    });

    return (
        <>
            <div id="conversation-main">
                <ul className="list_conversation">
                    {converFilter.map((conversationEle, index) => {
                        if (true) {
                            const { numberUnread } = conversationEle;
                            if (conversationEle.lastMessage) {
                                return (
                                    <Dropdown
                                        key={index}
                                        overlay={
                                            <Menu>
                                                <SubMenuClassify
                                                    data={classifies}
                                                    idConver={
                                                        conversationEle.id
                                                    }
                                                />
                                                {user.id ===
                                                    conversationEle.leaderId && (
                                                    <Menu.Item
                                                        danger
                                                        key="1"
                                                        icon={<DeleteFilled />}
                                                    >
                                                        Xoá hội thoại
                                                    </Menu.Item>
                                                )}
                                            </Menu>
                                        }
                                        trigger={['contextMenu']}
                                    >
                                        <li
                                            key={index}
                                            className={`conversation-item ${
                                                numberUnread === 0
                                                    ? ''
                                                    : 'arrived-message'
                                            } `}
                                        >
                                            <ConversationSingle
                                                conversation={conversationEle}
                                            />
                                        </li>
                                    </Dropdown>
                                );
                            }
                        }
                    })}
                </ul>
            </div>
        </>
    );
}

export default ConversationContainer;
