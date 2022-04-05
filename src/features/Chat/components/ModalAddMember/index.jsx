import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Col, Divider, Input, Modal, Row } from 'antd';
import {
    EditOutlined,
    InfoCircleFilled,
    SearchOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Text from 'antd/lib/typography/Text';
import PersonalIcon from '../PersonalIcon';
import ItemsSelected from 'components/ItemsSelected';

ModalAddMember.propTypes = {
    onOk: PropTypes.func,
    loading: PropTypes.bool,
    onCancel: PropTypes.func,
    isVisible: PropTypes.bool.isRequired,
    typeModal: PropTypes.number.isRequired,
};

ModalAddMember.defaultProps = {
    onOk: null,
    loading: false,
    onCancel: null,
};
function ModalAddMember({ loading, onOk, onCancel, isVisible, typeModal }) {
    const { friends, memberInConversation } = useSelector(
        (state) => state.chat
    );
    const [nameGroup, setNameGroup] = useState('');
    const [checkList, setCheckList] = useState([]);
    const [isShowError, setIsShowError] = useState(false);
    const [itemSelected, setItemSelected] = useState([]);
    const [frInput, setFrInput] = useState('');

    const [initalFriend, setInitalFriend] = useState([]);
    const initialValue = memberInConversation.map((ele) => ele.id);

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    // kiểm tra người có trong nhóm và disable những đối tượng đó
    const checkInitialValue = (value) => {
        const index = initialValue.findIndex((ele) => ele === value);
        return index > -1;
    };

    const handleOk = () => {};
    const handleOnBlur = () => {};
    const handleChange = () => {};
    const handleSearch = () => {};
    const handleChangeCheckBox = () => {};
    const handleRemoveItem = () => {};
    return (
        <Modal
            title={typeModal === 2 ? 'Thêm thành viên' : 'Tạo nhóm'}
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered={true}
            okText="Xác nhận"
            cancelText="Hủy"
            okButtonProps={{
                disabled:
                    (!nameGroup.trim().length > 0 && typeModal === 1) ||
                    checkList.length < 1,
            }}
            confirmLoading={loading}
        >
            <div id="modal-add-member-to-conver">
                {typeModal === 1 && (
                    <>
                        <div className="heading-group">
                            <div className="select-background">
                                <EditOutlined />
                            </div>

                            <div className="input-name-group">
                                <Input
                                    size="middle"
                                    placeholder="Nhập tên nhóm"
                                    style={{ width: '100%' }}
                                    onBlur={handleOnBlur}
                                    value={nameGroup}
                                    onChange={handleChange}
                                />

                                {isShowError && (
                                    <Text type="danger">
                                        <InfoCircleFilled /> Tên nhóm không được
                                        để trống
                                    </Text>
                                )}
                            </div>
                        </div>
                        <Divider orientation="left" plain>
                            <span className="divider-title">
                                Thêm bạn vào nhóm
                            </span>
                        </Divider>
                    </>
                )}

                <div className="search-friend-input">
                    <Input
                        size="middle"
                        placeholder="Nhập tên bạn muốn tìm kiếm"
                        style={{ width: '100%' }}
                        prefix={<SearchOutlined />}
                        onChange={handleSearch}
                        value={frInput}
                    />
                </div>

                <Divider />

                <div className="list-friend-interact">
                    <div className="list-friend-interact--left">
                        <div className="title-list-friend">
                            <span>Danh sách bạn bè</span>
                        </div>
                        <div className="checkbox-list-friend">
                            <Checkbox.Group
                                style={{ width: '100%' }}
                                value={checkList}
                            >
                                <Row gutter={[0, 12]}>
                                    {initalFriend.map((ele, index) => (
                                        <Col span={24} key={index}>
                                            <Checkbox
                                                disabled={checkInitialValue(
                                                    ele.id
                                                )}
                                                value={ele.id}
                                                onChange={handleChangeCheckBox}
                                            >
                                                <div className="item-checkbox">
                                                    <PersonalIcon
                                                        demention={36}
                                                        avatar={ele.avatar?.url}
                                                        name={ele.name}
                                                    />

                                                    <span className="item-name">
                                                        {ele.name}
                                                    </span>
                                                </div>
                                            </Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </div>

                    <div
                        className={`list-friend-interact--right ${
                            itemSelected.length > 0 ? '' : 'close'
                        } `}
                    >
                        <div className="title-list-friend-checked">
                            <strong>
                                Đã chọn:{' '}
                                {itemSelected.length > 0 && itemSelected.length}
                            </strong>
                        </div>

                        <div className="checkbox-list-friend">
                            <ItemsSelected
                                items={itemSelected}
                                onRemove={handleRemoveItem}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalAddMember;
