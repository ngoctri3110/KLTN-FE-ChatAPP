import React from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { FastField, Form, Formik } from 'formik';
import UserNameField from 'customfield/UserNameField';
import PasswordField from 'customfield/PasswordField';
import { Link } from 'react-router-dom';
import { loginValues } from 'features/Account/initValues';

const { Text, Title } = Typography;

LoginPage.propTypes = {};

function LoginPage(props) {
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
                    <Divider />
                    <div className="form-account">
                        <Formik
                            initialValues={{ ...loginValues.initial }}
                            onSubmit={(values) => handleSubmit(values)}
                            validationSchema={loginValues.validationSchema}
                            enableReinitialize={true}
                        >
                            {(formikProps) => {
                                return (
                                    <Form>
                                        <Row gutter={[0, 8]}>
                                            <Col span={24}>
                                                <FastField
                                                    name="username"
                                                    component={UserNameField}
                                                    type="text"
                                                    title="Tài khoản"
                                                    placeholder="Tài khoản"
                                                    maxLength={50}
                                                    titleCol={24}
                                                    inputCol={24}
                                                />
                                            </Col>

                                            <Col span={24}>
                                                <FastField
                                                    name="password"
                                                    component={PasswordField}
                                                    type="password"
                                                    title="Mật khẩu"
                                                    placeholder="Mật khẩu"
                                                    maxLength={200}
                                                    titleCol={24}
                                                    inputCol={24}
                                                />
                                            </Col>
                                            <Col span={24}>
                                                <br />
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    block
                                                >
                                                    Đăng nhập
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
                        <Link to="/account/forgot">Quên mật khẩu?</Link>
                        <Text>
                            Bạn chưa có tài khoản?
                            <Link to="/account/registry">
                                {' '}
                                <u>Đăng ký ngay!</u>
                            </Link>
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
