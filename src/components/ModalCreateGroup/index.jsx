import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Modal } from 'antd';

ModalCreateGroup.propTypes = {
    loading: PropTypes.bool,
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
};

ModalCreateGroup.defaultProps = {
    loading: false,
    isVisible: false,
    onCancel: null,
    onOk: null,
};
function ModalCreateGroup({ loading, isVisible, onCancel, onOk }) {
    const [itemSelected, setItemSelected] = useState([]);
    const [nameGroup, setNameGroup] = useState('');

    const handleOnOk = () => {};
    const handleOnCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };
    return (
        <Modal
            title="Tạo nhóm"
            confirmLoading={loading}
            visible={isVisible}
            onOk={handleOnOk}
            onCancel={handleOnCancel}
            okText="Tạo nhóm"
            cancelText="Hủy"
            okButtonProps={{
                disable: !(itemSelected.length > 0 && nameGroup.length > 0),
            }}
        >
            Tạo nhóm
        </Modal>
    );
}

export default ModalCreateGroup;
