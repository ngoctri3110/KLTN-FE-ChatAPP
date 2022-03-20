import {
    AlignLeftOutlined,
    AppstoreAddOutlined,
    SearchOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import { Input, Radio } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import './style.scss';
// const { TabPane } = Tabs;

SearchContainer.propTypes = {
    onVisibleFilter: PropTypes.func,
    onSearchChange: PropTypes.func,
    valueText: PropTypes.string,
    onSubmitSearch: PropTypes.func,
    isFriendPage: PropTypes.bool,
    onFilterClasify: PropTypes.func,
    valueClassify: PropTypes.string.isRequired,
};

SearchContainer.defaultProps = {
    onVisibleFilter: null,
    valueText: '',
    onSearchChange: null,
    onSubmitSearch: null,
    isFriendPage: false,
    onFilterClasify: null,
};
function SearchContainer({
    valueText,
    onSearchChange,
    onSubmitSearch,
    isFriendPage,
    onFilterClasify,
    valueClassify,
}) {
    return (
        <div id="search-wrapper">
            <div className="search-main">
                <div className="search-top">
                    <div className="search-top_input-search">
                        <Input
                            placeholder="Tìm kiếm"
                            prefix={<SearchOutlined />}
                            allowClear
                            value={valueText}
                        />
                    </div>

                    <div className="search-top_add-friend">
                        <UserAddOutlined />
                    </div>

                    <div className="search-top_create-group">
                        <UsergroupAddOutlined />
                    </div>
                </div>
                {!isFriendPage && (
                    <>
                        <div className="search-bottom">
                            <div className="classify-title">
                                {/* <div>
                                <AlignLeftOutlined /> &nbsp;
                                
                            </div> */}
                                <Scrollbars
                                    autoHide={true}
                                    autoHideTimeout={1000}
                                    autoHideDuration={200}
                                    style={{ height: '30px', width: '100%' }}
                                >
                                    <Radio.Group size="small">
                                        <Radio value={'0'}>Tất cả</Radio>
                                        <Radio value={'1'}>Chưa đọc</Radio>
                                    </Radio.Group>
                                </Scrollbars>
                                {/* <Tabs defaultActiveKey="1">
                                <TabPane tab="Tất cả" key="1">
                                    Tất cả
                                </TabPane>
                                <TabPane tab="Chưa đọc" key="2">
                                    Chưa đọc
                                </TabPane>
                            </Tabs> */}
                                <div className="add-classify">
                                    <span>Phân loại</span>&nbsp;
                                    <AppstoreAddOutlined />
                                </div>
                            </div>
                            <div className="classify-element">
                                <div className="classify-element-title">
                                    <AlignLeftOutlined />{' '}
                                </div>
                                <Scrollbars
                                    autoHide={true}
                                    autoHideTimeout={1000}
                                    autoHideDuration={200}
                                    style={{ height: '42px', width: '100%' }}
                                >
                                    <Radio.Group size="small">
                                        <Radio value={'0'}>Cong viec</Radio>
                                    </Radio.Group>
                                </Scrollbars>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchContainer;
