import {
    DeleteOutlined,
    EditOutlined,
    EyeTwoTone,
    PlusCircleTwoTone,
    PlusOutlined,
} from '@ant-design/icons';
import {
    Button,
    Col,
    Divider,
    Drawer,
    Form,
    Input,
    message,
    Popconfirm,
    Row,
    Space,
    Table,
    Typography,
} from 'antd';
import stickerApi from 'api/stickerApi';
import React, { useEffect, useState } from 'react';
const { Search } = Input;
const { Link } = Typography;
const StickerGroupPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [dataTemp, setDataTemp] = useState([]);

    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleAddEmoji, setVisibleAddemoji] = useState(false);
    const onSearch = () => {};

    const handleGetAllSticker = async () => {
        try {
            const listSticker = await stickerApi.fetchAllSticker();
            return listSticker;
        } catch (error) {}
    };
    useEffect(() => {
        handleGetAllSticker()
            .then((result) => {
                setDataSource(result);
                setDataTemp(result);
            })
            .catch((err) => {
                throw err;
            });
    }, []);

    const showDrawerCreateSticker = () => {
        setVisibleCreate(true);
    };
    const onCloseCreate = () => {
        setVisibleCreate(false);
    };
    const handleCreateSticker = () => {};
    const handleDeleteSticker = async (id) => {
        try {
            await stickerApi.deleteSticker(id);
            message.success('Đã xoá group sticker', 5);
            setDataSource(await handleGetAllSticker());
        } catch (error) {
            message.error('Xóa thất bại vì sticker có chứa emoji', 5);
        }
    };
    const onCancel = () => {};
    const showDrawerUpdate = () => {
        setVisibleUpdate(true);
    };

    const showDrawerCreateEmoji = () => {};
    const handleViewEmoji = () => {};

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (data, row) => (
                <Space size="middle">
                    <Popconfirm
                        title="Bạn có muốn xoá ?"
                        onConfirm={() => handleDeleteSticker(data.id)}
                        onCancel={onCancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Link alt="xoá sticker">
                            <DeleteOutlined />
                            Xoá{' '}
                        </Link>
                    </Popconfirm>

                    <Link
                        onClick={() =>
                            showDrawerUpdate(
                                data.id,
                                data.name,
                                data.description
                            )
                        }
                    >
                        <EditOutlined />
                        Sửa{' '}
                    </Link>
                    <Link onClick={() => showDrawerCreateEmoji(data.id)}>
                        <PlusCircleTwoTone />
                        Thêm Sticker{' '}
                    </Link>

                    <Link
                        alt="xem sticker emoji"
                        onClick={() => handleViewEmoji(data.id, data.stickers)}
                    >
                        <EyeTwoTone />
                        Xem Sticker emoji{' '}
                    </Link>
                </Space>
            ),
        },
    ];

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
            <Col offset={20} span={6}>
                <Button
                    type="primary"
                    placement="right"
                    onClick={showDrawerCreateSticker}
                    icon={<PlusOutlined />}
                >
                    Add Sticker
                </Button>
            </Col>
            <Drawer
                title="Tạo sticker"
                width={720}
                onClose={onCloseCreate}
                visible={visibleCreate}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    layout="vertical"
                    onFinish={handleCreateSticker}
                    hideRequiredMark
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên sticker',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên sticker" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả',
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Nhập mô tả"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </Form>
            </Drawer>

            <Table
                dataSource={dataSource}
                columns={columns}
                bordered={false}
            ></Table>
        </div>
    );
};

export default StickerGroupPage;
