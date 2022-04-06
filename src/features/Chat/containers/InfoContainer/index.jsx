import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfoTitle from 'features/Chat/components/InfoTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMedia } from 'features/Chat/slice/mediaSlice';
import Scrollbars from 'react-custom-scrollbars';
import './style.scss';
import InfoNameAndThumbnail from 'features/Chat/components/InfoNameAndThumbnail';
import InfoMember from 'features/Chat/components/InfoMember';
import Channel from 'features/Chat/components/Channel';
import StorageMedia from 'features/Chat/components/StorageMedia';
import StorageFile from 'features/Chat/components/StorageFile';
import OtherSettings from 'features/Chat/components/OtherSettings';
import InfoMediaSearch from 'features/Chat/components/InfoMediaSearch';
import userApi from 'api/userApi';
import InfoMembersGroup from 'features/Chat/components/InfoMembersGroup';

InfoContainer.propTypes = {
    onViewChannel: PropTypes.func,
    onOpenInfoBlock: PropTypes.func,
};

InfoContainer.defaultProps = {
    onViewChannel: null,
    onOpenInfoBlock: null,
};

function InfoContainer({ onViewChannel, onOpenInfoBlock }) {
    const [isFind, setFind] = useState({ tabpane: 0, view: 0 });

    const dispatch = useDispatch();

    const {
        memberInConversation,
        type,
        currentConversation,
        conversations,
        channels,
    } = useSelector((state) => state.chat);
    const { media } = useSelector((state) => state.media);

    useEffect(() => {
        if (currentConversation)
            dispatch(fetchAllMedia({ conversationId: currentConversation }));
        //eslint-disable-next-line
    }, [currentConversation]);

    const handleOnBack = (value) => {
        setFind({ view: value, tabpane: 0 });
    };

    const handleViewMemberClick = (value) => {
        setFind({ view: value, tabpane: 0 });
    };
    const handleViewMediaClick = (value, tabpane) => {
        setFind({ view: value, tabpane });
    };

    return (
        <div id="main-info">
            {(() => {
                if (isFind.view === 0) {
                    return (
                        <>
                            <div className="info_title-wrapper">
                                <InfoTitle
                                    onBack={handleOnBack}
                                    text={
                                        conversations.find(
                                            (ele) =>
                                                ele.id === currentConversation
                                        ).type === 'GROUP'
                                            ? 'Thông tin nhóm'
                                            : ' Thông tin hội thoại'
                                    }
                                />
                            </div>
                            <Scrollbars
                                autoHide={true}
                                autoHideTimeout={1000}
                                autoHideDuration={200}
                                style={{
                                    width: '100%',
                                    height: 'calc(100vh - 68px)',
                                }}
                            >
                                <div className="body-info">
                                    <div className="info_name-and-thumbnail-wrapper">
                                        <InfoNameAndThumbnail
                                            conversation={conversations.find(
                                                (ele) =>
                                                    ele.id ===
                                                    currentConversation
                                            )}
                                        />
                                    </div>

                                    {type === 'GROUP' && (
                                        <>
                                            <div className="info_member-wrapper">
                                                <InfoMember
                                                    viewMemberClick={
                                                        handleViewMemberClick
                                                    }
                                                    quantity={
                                                        memberInConversation.length
                                                    }
                                                />
                                            </div>

                                            <div className="info_member-wrapper">
                                                <Channel
                                                    onViewChannel={
                                                        onViewChannel
                                                    }
                                                    data={channels}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div className="info_archive-media-wrapper">
                                        <StorageMedia
                                            viewMediaClick={
                                                handleViewMediaClick
                                            }
                                            name="Ảnh"
                                            items={media.images}
                                        />
                                    </div>

                                    <div className="info_archive-media-wrapper">
                                        <StorageMedia
                                            viewMediaClick={
                                                handleViewMediaClick
                                            }
                                            name="Video"
                                            items={media.videos}
                                        />
                                    </div>

                                    <div className="info_archive-file-wrapper">
                                        <StorageFile
                                            viewMediaClick={
                                                handleViewMediaClick
                                            }
                                            items={media.files}
                                        />
                                    </div>

                                    {conversations.find(
                                        (ele) => ele.id === currentConversation
                                    ).type && (
                                        <div className="info_another-setting-wrapper">
                                            <OtherSettings />
                                        </div>
                                    )}
                                </div>
                            </Scrollbars>
                        </>
                    );
                } else if (isFind.view === 2) {
                    return (
                        <InfoMediaSearch
                            onBack={handleOnBack}
                            tabpane={isFind.tabpane}
                        />
                    );
                } else {
                    return (
                        <InfoMembersGroup
                            onBack={handleOnBack}
                            members={memberInConversation}
                        />
                    );
                }
            })()}
        </div>
    );
}

export default InfoContainer;
