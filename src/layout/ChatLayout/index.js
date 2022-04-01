import { Col, Row } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import NavbarContainer from 'features/Chat/containers/NavbarContainer';
import Chat from 'features/Chat';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Friend from 'features/Friend';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllSticker,
    fetchListClassify,
    fetchListConversations,
} from 'features/Chat/slice/chatSlice';
import {
    fetchFriends,
    fetchListGroup,
    fetchListMyRequestFriend,
    fetchListRequestFriend,
} from 'features/Friend/friendSlice';

const ChatLayout = () => {
    const [codeRevoke, setCodeRevoke] = useState('');
    const codeRevokeRef = useRef();
    const [idNewMessage, setIdNewMessage] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.global);
    const { conversations } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(fetchListRequestFriend());
        dispatch(fetchListMyRequestFriend());
        dispatch(
            fetchFriends({
                name: '',
            })
        );
        dispatch(
            fetchListGroup({
                name: '',
                type: 'GROUP',
            })
        );
        // dispatch(fetchListClassify());
        dispatch(fetchListConversations({}));
        dispatch(fetchAllSticker());
    }, []);

    useEffect(() => {
        if (conversations.length === 0) return;

        const conversationIds = conversations.map(
            (conversationEle) => conversationEle.id
        );
    }, [conversations]);

    const handleSetCodeRevoke = (code) => {
        setCodeRevoke(code);
        codeRevokeRef.current = code;
    };
    console.log(codeRevoke);
    return (
        <div>
            <Row gutter={[0, 0]}>
                <Col
                    span={1}
                    xl={{ span: 1 }}
                    lg={{ span: 1 }}
                    md={{ span: 2 }}
                    sm={{ span: 3 }}
                    xs={{ span: 4 }}
                >
                    <NavbarContainer onSaveCodeRevoke={handleSetCodeRevoke} />
                </Col>

                <Col
                    span={23}
                    xl={{ span: 23 }}
                    lg={{ span: 23 }}
                    md={{ span: 22 }}
                    sm={{ span: 21 }}
                    xs={{ span: 20 }}
                >
                    <Routes>
                        <Route
                            index
                            path=""
                            element={<Chat idNewMessage={idNewMessage} />}
                        />
                        <Route
                            path="friends"
                            element={<Friend authed={true} />}
                        />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Col>
            </Row>
        </div>
    );
};

export default ChatLayout;
