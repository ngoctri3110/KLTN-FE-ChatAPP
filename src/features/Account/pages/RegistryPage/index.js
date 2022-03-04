import React from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { FastField, Form, Formik } from 'formik';
import UserNameField from 'customfield/UserNameField';
import PasswordField from 'customfield/PasswordField';
import { Link } from 'react-router-dom';
import { registryValues } from 'features/Account/initValues';
import InputField from 'customfield/InputField';

const { Text, Title } = Typography;

RegistryPage.propTypes = {};

function RegistryPage(props) {
    const handleSubmit = (values) => {
        console.log(values);
    };
    return (
        <div className="account-common-page">
            <div className="account-wrapper">
                <div className="account">
                    <Title level={2} style={{ textAlign: 'center' }}>
                        <Text style={{ color: '#4d93ff' }}>TALO</Text>
                    </Title>
                    <Divider>Nhập thông tin</Divider>
                    <div className="form-account">
                        <Formik
                            initialValues={{ ...registryValues.initial }}
                            onSubmit={(values) => handleSubmit(values)}
                            validationSchema={registryValues.validationSchema}
                            enableReinitialize={true}
                        >
                            {(formikProps) => {
                                return (
                                    <Form>
                                        <Row gutter={[0, 8]}>
                                            <>
                                                <Col span={24}>
                                                    <FastField
                                                        name="name"
                                                        component={InputField}
                                                        type="text"
                                                        title="Họ tên"
                                                        placeholder="Ví dụ: Nguyễn Văn A"
                                                        maxLength={50}
                                                        titleCol={24}
                                                        inputCol={24}
                                                    />
                                                </Col>
                                                <Col span={24}>
                                                    <FastField
                                                        name="username"
                                                        component={
                                                            UserNameField
                                                        }
                                                        type="text"
                                                        title="Tài khoản"
                                                        placeholder="Nhập email/SĐT đăng ký"
                                                        maxLength={50}
                                                        titleCol={24}
                                                        inputCol={24}
                                                    />
                                                </Col>

                                                <Col span={24}>
                                                    <FastField
                                                        name="password"
                                                        component={
                                                            PasswordField
                                                        }
                                                        type="password"
                                                        title="Mật khẩu"
                                                        placeholder="Mật khẩu ít nhất 8 kí tự"
                                                        maxLength={200}
                                                        titleCol={24}
                                                        inputCol={24}
                                                    />
                                                </Col>

                                                <Col span={24}>
                                                    <FastField
                                                        name="passwordconfirm"
                                                        component={
                                                            PasswordField
                                                        }
                                                        type="password"
                                                        title=" Xác nhận mật khẩu"
                                                        placeholder="Nhập lại mật khẩu"
                                                        maxLength={200}
                                                        titleCol={24}
                                                        inputCol={24}
                                                    />
                                                </Col>
                                            </>
                                            <Col span={24}>
                                                <Button
                                                    htmlType="submit"
                                                    type="primary"
                                                    block
                                                >
                                                    Đăng ký
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                    <Divider>Hoặc</Divider>
                    <div className="addtional-link">
                        <Link to="/">Đăng nhập</Link>
                        <Link to="/account/forgot">Quên mật khẩu?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistryPage;
