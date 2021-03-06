import {
    DeleteOutlined,
    EditOutlined,
    EyeTwoTone,
    PlusCircleTwoTone,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {
    Button,
    Col,
    Divider,
    Drawer,
    Form,
    Input,
    Menu,
    message,
    Popconfirm,
    Row,
    Space,
    Table,
    Typography,
    Upload,
} from 'antd';
import stickerApi from 'api/stickerApi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;
const { Link } = Typography;
const StickerPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [dataTemp, setDataTemp] = useState([]);

    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleAddEmoji, setVisibleAddemoji] = useState(false);

    const [temp, setTemp] = useState('');
    const [tempName, setName] = useState('');
    const [tempDescription, setDescription] = useState('');
    const [file, setFile] = useState([]);
    const navigate = useNavigate();

    const onSearch = (value) => {
        console.log('value', value);
        const filterTable = dataSource.filter((name) =>
            Object.keys(name).some((k) =>
                String(name[k]).toLowerCase().includes(value.toLowerCase())
            )
        );

        if (value === '') {
            setDataSource(dataTemp);
        } else {
            setDataSource(filterTable);
        }
    };

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
    const handleCreateSticker = async (values) => {
        const { name, description } = values;

        try {
            await stickerApi.createSticker(name, description);
            setDataSource([...dataSource, values]);
            message.success('???? t???o sticker th??nh c??ng', 5);
        } catch (error) {
            message.error('T???o sticker th???t b???i', 5);
        }
    };
    const handleDeleteSticker = async (id) => {
        try {
            await stickerApi.deleteSticker(id);
            message.success('???? xo?? group sticker', 5);
            setDataSource(await handleGetAllSticker());
        } catch (error) {
            message.error('X??a th???t b???i v?? sticker c?? ch???a emoji', 5);
        }
    };
    const onCancel = () => {};
    const showDrawerUpdate = (id, name, description) => {
        setVisibleUpdate(true);
        setTemp(id);
        setName(name);
        setDescription(description);
    };

    const handleUpdateSticker = async (values) => {
        const { name, description } = values;
        try {
            await stickerApi.updateSticker(temp, name, description);
            message.success('Ch???nh s???a sticker ho??n t???t', 5);
            setDataSource(await handleGetAllSticker());
            onCloseUpdate();
        } catch (error) {
            message.error('Ch???nh s???a sticker ???? x???y ra l???i', 5);
        }
    };
    const onCloseUpdate = () => {
        setVisibleUpdate(false);
        setTemp('');
        setName('');
        setDescription('');
    };

    const showDrawerCreateEmoji = (id) => {
        setTemp(id);
        setVisibleAddemoji(true);
    };
    const handleFileChange = async ({ file, fileList }) => {
        setFile(fileList);
    };
    const handleAddEmoji = async () => {
        try {
            for (let index = 0; index < file.length; index++) {
                const item = file[index].originFileObj;
                const frmData = new FormData();
                frmData.append('file', item);
                await stickerApi.addEmoji(temp, frmData);
            }
            message.success('Th??m emoji v??o sticker ho??n t???t', 5);
        } catch (error) {
            message.error('Th??m emoji v??o sticker ???? x???y ra l???i', 5);
        }

        const listSticker = await stickerApi.fetchAllSticker();
        setDataSource(listSticker);
    };

    const handleViewEmoji = async (id, emojis) => {
        try {
            console.log(emojis);

            navigate(`/admin/stickers/${id}`, { state: emojis });
        } catch (error) {}
    };

    const columns = [
        {
            title: 'T??n',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'M?? t???',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Thao t??c',
            key: 'action',
            render: (data, row) => (
                <Space size="middle">
                    <Popconfirm
                        title="B???n c?? mu???n xo?? ?"
                        onConfirm={() => handleDeleteSticker(data.id)}
                        onCancel={onCancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Link alt="xo?? sticker">
                            <DeleteOutlined />
                            Xo??{' '}
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
                        S???a{' '}
                    </Link>
                    <Link onClick={() => showDrawerCreateEmoji(data.id)}>
                        <PlusCircleTwoTone />
                        Th??m Sticker{' '}
                    </Link>

                    <Link
                        alt="xem sticker emoji"
                        onClick={() => handleViewEmoji(data.id, data.emojis)}
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
            <Divider orientation="left">Qu???n l?? sticker</Divider>
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
                title="T???o sticker"
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
                                label="T??n"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng nh???p t??n sticker',
                                    },
                                ]}
                            >
                                <Input placeholder="Nh???p t??n sticker" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="description"
                                label="M?? t???"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng nh???p m?? t???',
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Nh???p m?? t???"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">
                        L??u
                    </Button>
                </Form>
            </Drawer>

            <Drawer
                visible={visibleUpdate}
                title="Ch???nh s???a sticker"
                width={720}
                bodyStyle={{ paddingBottom: 80 }}
                onClose={onCloseUpdate}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        name: tempName,
                        description: tempDescription,
                    }}
                    hideRequiredMark
                    onFinish={handleUpdateSticker}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="T??n"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nh???p t??n sticker',
                                    },
                                ]}
                            >
                                <Input placeholder="Nh???p t??n sticker" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="M?? t???"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng nh???p m?? t???',
                                    },
                                ]}
                            >
                                <Input placeholder="Nh???p m?? t???" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">
                        Ch???nh s???a
                    </Button>
                </Form>
            </Drawer>

            <Drawer
                visible={visibleAddEmoji}
                title="Th??m emoji v??o sticker"
                width={720}
                onClose={() => setVisibleAddemoji(false)}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Upload
                    listType="picture"
                    defaultFileList={[...file]}
                    onChange={handleFileChange}
                >
                    <Button icon={<UploadOutlined />}>T???i l??n</Button>
                </Upload>
                <Button
                    style={{ marginTop: '2rem' }}
                    type="primary"
                    onClick={handleAddEmoji}
                >
                    Th??m
                </Button>
            </Drawer>

            <Table
                dataSource={dataSource}
                columns={columns}
                bordered={false}
            ></Table>
        </div>
    );
};

export default StickerPage;
