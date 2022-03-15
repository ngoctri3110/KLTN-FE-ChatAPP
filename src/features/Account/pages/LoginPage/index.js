import React, { useState } from 'react';
import { Button, Col, Divider, Row, Tag, Typography } from 'antd';
import { FastField, Form, Formik } from 'formik';
import UserNameField from 'customfield/UserNameField';
import PasswordField from 'customfield/PasswordField';
import { Link, useNavigate } from 'react-router-dom';
import { loginValues } from 'features/Account/initValues';
import { useDispatch } from 'react-redux';
import loginApi from 'api/loginAPI';
import { fetchUserProfile, setLogin } from 'app/globalSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { setLoadingAccount } from 'features/Account/accountSlice';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

LoginPage.propTypes = {};

function LoginPage(props) {
    const [isError, setError] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const { username, password } = values;
        try {
            dispatch(setLoadingAccount(true));
            const { token, refreshToken } = await loginApi.login(
                username,
                password
            );
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            dispatch(setLogin(true));
            const { isAdmin } = unwrapResult(
                await dispatch(fetchUserProfile())
            );
            if (isAdmin) navigate('/admin');
            else navigate('/chat');
        } catch (error) {
            setError(true);
        }
        dispatch(setLoadingAccount(false));
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
                                            {isError ? (
                                                <Col span={24}>
                                                    <Tag
                                                        color="error"
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}
                                                        icon={
                                                            <CloseCircleOutlined />
                                                        }
                                                    >
                                                        Tài khoản không hợp lệ
                                                    </Tag>
                                                </Col>
                                            ) : (
                                                ''
                                            )}
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
