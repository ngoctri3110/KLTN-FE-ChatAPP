import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import FriendItem from '../FriendItem';
import { ExclamationCircleOutlined } from '@ant-design/icons';

ListFriend.propTypes = {
    data: PropTypes.array,
};

ListFriend.defaultProps = {
    data: [],
};

function ListFriend({ data }) {
    useEffect(() => {
        console.log('friend', { data });
    }, []);
    const handleOnClickMenu = async (key, id) => {};

    return (
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            style={{ height: '100%', width: '100%' }}
        >
            {data.length > 0 &&
                data.map((item, index) => (
                    <FriendItem
                        key={index}
                        data={item}
                        onClickMenu={handleOnClickMenu}
                    />
                ))}
        </Scrollbars>
    );
}

export default ListFriend;
