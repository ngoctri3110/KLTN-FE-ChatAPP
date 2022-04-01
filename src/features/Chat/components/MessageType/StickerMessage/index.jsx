import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import { fallback } from 'assets/images/fallbackImage';
import './style.scss';
StickerMessage.propTypes = {
    content: PropTypes.string.isRequired,
    dateAt: PropTypes.object.isRequired,
    isSeen: PropTypes.bool,
};

StickerMessage.defaultProps = {
    isSeen: false,
};

function StickerMessage({ content, dateAt, isSeen }) {
    return (
        <>
            <div className="messsage-image-wrapper">
                <div className="message-image--main">
                    <Image
                        className="message-image--main-sticker"
                        src={content}
                        fallback={fallback}
                        preview={false}
                    />
                </div>
            </div>
            <div className="time-and-last_view">
                <div className="time-send">
                    <span>
                        {`0${dateAt.getHours()}`.slice(-2)}:
                        {`0${dateAt.getMinutes()}`.slice(-2)}
                    </span>
                </div>

                {isSeen && <div className="is-seen-message">Đã xem</div>}
            </div>
        </>
    );
}

export default StickerMessage;
