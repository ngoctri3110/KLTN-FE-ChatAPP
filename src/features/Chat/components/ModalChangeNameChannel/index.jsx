import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';

ModalChangeNameChannel.propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    initialValue: PropTypes.string,
};

ModalChangeNameChannel.defaultProps = {
    visible: false,
    onOk: null,
    onCancel: null,
    initialValue: '',
};

function ModalChangeNameChannel({ visible, onOk, onCancel, initialValue }) {
    const [nameValue, setNameValue] = useState('');

    useEffect(() => {
        setNameValue(initialValue);
    }, [initialValue, visible]);

    const handleOnCancel = () => {
        if (onCancel) {
            onCancel();
            setNameValue('');
        }
    };
    const handleOnOk = () => {
        if (onOk) {
            onOk(nameValue);
        }
    };

    const handleOnchange = (e) => {
        setNameValue(e.target.value);
    };
    return (
        <Modal
            title="Đổi tên channel"
            visible={visible}
            onCancel={handleOnCancel}
            onOk={handleOnOk}
            onText="Xác nhận"
            cancelText="Hủy"
            okButtonProps={{ disabled: nameValue.trim().length === 0 }}
        >
            <Input
                placeholder="Nhập tên channel mới"
                allowClear
                value={nameValue}
                onChange={handleOnchange}
            />
        </Modal>
    );
}

export default ModalChangeNameChannel;
