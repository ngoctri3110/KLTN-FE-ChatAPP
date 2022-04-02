import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

InfoContainer.propTypes = {
    socket: PropTypes.object,
    onViewChannel: PropTypes.func,
    onOpenInfoBlock: PropTypes.func,
};

InfoContainer.defaultProps = {
    socket: {},
    onViewChannel: null,
    onOpenInfoBlock: null,
};

function InfoContainer() {
    return <div>InfoContainer</div>;
}

export default InfoContainer;
