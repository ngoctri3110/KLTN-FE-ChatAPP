import { Divider, Input } from 'antd';
import React from 'react';
const { Search } = Input;
const StickerGroupPage = () => {
    const onSearch = () => {};
    return (
        <div className="sticker-page" style={{ padding: '10px 20px' }}>
            <Divider orientation="left">Quản lý sticker</Divider>
            <div style={{ textAlign: 'center' }}>
                <Search
                    placeholder="Sticker"
                    onSearch={onSearch}
                    enterButton
                    style={{ width: '40%' }}
                />
            </div>
            <Divider />
        </div>
    );
};

export default StickerGroupPage;
