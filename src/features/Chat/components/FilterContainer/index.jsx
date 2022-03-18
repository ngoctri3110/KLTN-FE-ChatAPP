import { Tabs } from 'antd';
import React from 'react';
import './style.scss';

function FilterContainer() {
    const { TabPane } = Tabs;
    return (
        <div className="filter-container">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tất cả" key="1"></TabPane>
                <TabPane tab="Cá nhân" key="2"></TabPane>
                <TabPane tab="Nhóm" key="3"></TabPane>
            </Tabs>
        </div>
    );
}

export default FilterContainer;
