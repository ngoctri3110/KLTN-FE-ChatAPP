import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Menu, Tag } from 'antd';
import { TagFilled } from '@ant-design/icons';
import ClassifyApi from 'api/ClassifyApi';
import { useDispatch } from 'react-redux';
import { fetchListClassify } from 'features/Chat/slice/chatSlice';

SubMenuClassify.propTypes = {
    data: PropTypes.array,
    idConver: PropTypes.string.isRequired,
};

SubMenuClassify.defaultProps = {
    data: [],
};
function SubMenuClassify({ data, idConver }) {
    const { SubMenu } = Menu;
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const handleClickClassify = async (id) => {
        await ClassifyApi.addClassifyForConversation(id, idConver);
        dispatch(fetchListClassify());
    };
    return (
        <SubMenu
            title={<span className="menu-item--highlight">Phân loại</span>}
            key="sub-1"
        >
            {data.lenth > 0 &&
                data.map((ele) => (
                    <Menu.Item
                        key={ele.id}
                        icon={
                            <TagFilled style={{ color: `${ele.color.code}` }} />
                        }
                        onClick={() => handleClickClassify(ele._id)}
                    >
                        {ele.name}
                    </Menu.Item>
                ))}
            <Divider style={{ margin: '1rem 2rem' }} />
            <Menu.Item
                key="0"
                icon={<TagFilled />}
                onClick={() => setVisible(true)}
            >
                <span className="menu-item--highlight">
                    Quản lý thẻ phân loại
                </span>
            </Menu.Item>

            {/* visible == true => open modal phan loai */}
        </SubMenu>
    );
}

export default SubMenuClassify;
