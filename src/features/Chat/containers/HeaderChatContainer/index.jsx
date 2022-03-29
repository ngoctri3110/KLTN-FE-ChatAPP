import HeaderOptional from 'features/Chat/components/HeaderOptional';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './style.scss';

HeaderChatContainer.propTypes = {
    onPopUpInfo: PropTypes.func,
    onOpenDrawer: PropTypes.func,
};

HeaderChatContainer.defaultProps = {
    onPopUpInfo: null,
    onOpenDrawer: null,
};
function HeaderChatContainer({ onPopUpInfo, onOpenDrawer }) {
    const [detailConver, setDetailConver] = useState({});
    const { currentConversation, conversations, memberInConversation } =
        useSelector((state) => state.chat);

    useEffect(() => {
        if (currentConversation) {
            const tempConver = conversations.find(
                (conver) => conver.id === currentConversation
            );
            if (tempConver) {
                setDetailConver(tempConver);
            }
        }
    }, [currentConversation, conversations]);

    console.log('detailConver', detailConver);
    return (
        <div id="header-main">
            <HeaderOptional
                avatar={detailConver.avatar?.url}
                totalMembers={memberInConversation.length}
                name={detailConver.name}
                typeConver={detailConver.type}
                isLogin={detailConver?.isOnline}
                lastLogin={detailConver?.lastLogin}
                onPopUpInfo={onPopUpInfo}
                onOpenDrawer={onOpenDrawer}
            />
        </div>
    );
}

export default HeaderChatContainer;
