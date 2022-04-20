import { unwrapResult } from '@reduxjs/toolkit';
import {
    Button,
    Col,
    Divider,
    message,
    notification,
    Row,
    Typography,
} from 'antd';
import firebaseApi from 'api/firebaseApi';
import { fetchUserProfile, setLoading, setLogin } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { loginPhoneNumber } from 'features/Account/initValues';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { FastField, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import auth from 'utils/FirebaseApp';
const { Text, Title } = Typography;

const RESEND_OTP_TIME_LIMIT = 60;
const PhoneLogin = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let resendOTPTimerInterval;
    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            'recaptcha-container',
            {
                size: 'normal',
                callback: (response) => {
                    // console.log(response);
                    setIsSubmit(true);
                },
            },
            auth
        );
    };
    const openNotification = (mes) => {
        const args = {
            message: mes ? mes : 'Xác thực OTP để hoàn tất việc đăng ký',
        };
        notification.info(args);
    };
    console.log('isSubmit', isSubmit);

    const handleSignInPhoneNumber = (values) => {
        const { phoneNumber, otpValue } = values;
        console.log('phoneNumber', phoneNumber);
        console.log('otpValue', otpValue);
        console.log('isSubmit', isSubmit);
        // dispatch(setLoading(true));
        if (isSubmit) {
            console.log('submit otp');
            // try {
            //     window.confirmationResult
            //         .confirm(otpValue)
            //         .then((result) => {
            //             console.log(
            //                 'result.user.accessToken',
            //                 result.user.accessToken
            //             );
            //             handleConfirmOTP(phoneNumber, result.user.accessToken);
            //         })
            //         .catch((error) => {
            //             console.log(error);
            //         });
            // } catch (error) {
            //     console.log(error);
            // }
        } else {
            console.log('nhận');
            // generateRecaptcha();
            // let appVerifier = window.recaptchaVerifier;
            // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            //     .then((confirmationResult) => {
            //         setIsSubmit(true);
            //         openNotification();
            //         setCounter(RESEND_OTP_TIME_LIMIT);
            //         startResendOTPTimer();
            //         window.confirmationResult = confirmationResult;
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            setIsSubmit(true);
        }

        // dispatch(setLoading(false));
    };
    //useEffect khi counter thay đổi
    useEffect(() => {
        startResendOTPTimer();
        return () => {
            if (resendOTPTimerInterval) {
                clearInterval(resendOTPTimerInterval);
            }
        };
    }, [counter]);
    const startResendOTPTimer = () => {
        if (resendOTPTimerInterval) {
            clearInterval(resendOTPTimerInterval);
        }
        resendOTPTimerInterval = setInterval(() => {
            if (counter <= 0) {
                clearInterval(resendOTPTimerInterval);
            } else {
                setCounter(counter - 1);
            }
        }, 1000);
    };

    const handleConfirmOTP = async (phoneNumber, otpValue) => {
        try {
            await firebaseApi
                .confirmPhoneNumber(phoneNumber, otpValue)
                .then((res) => {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                    dispatch(setLogin(true));
                    const { isAdmin } = unwrapResult(
                        dispatch(fetchUserProfile())
                    );
                    if (isAdmin) navigate('/admin');
                    else navigate('/chat', { replace: true });
                });
        } catch (error) {
            message.error('OTP không hợp lệ');
        }
    };
    const handleResendOTP = () => {};
    const handleconfirmOTP = (otpValue) => {
        console.log('otpValue', otpValue);
    };

    return (
        <div className="account-common-page">
            <div className="account-wrapper">
                <div className="account">
                    <Title level={2} style={{ textAlign: 'center' }}>
                        <Text style={{ color: '#4d93ff' }}>TALO</Text>
                    </Title>
                    <Divider>Nhập số điện thoại</Divider>

                    <div className="form-account">
                        <Formik
                            initialValues={{ ...loginPhoneNumber.initial }}
                            onSubmit={(values) =>
                                handleSignInPhoneNumber(values)
                            }
                            validationSchema={
                                isSubmit
                                    ? loginPhoneNumber.validationSchemaPhoneWithOTP
                                    : loginPhoneNumber.validationSchemaPhone
                            }
                            enableReinitialize={true}
                        >
                            {(formikProps) => {
                                return (
                                    <Form>
                                        <Row gutter={[24, 16]}>
                                            {isSubmit ? (
                                                <>
                                                    <Col span={24}>
                                                        <FastField
                                                            name="otpValue"
                                                            component={
                                                                InputField
                                                            }
                                                            type="text"
                                                            title="Xác nhận OTP"
                                                            placeholder="Mã OTP có 6 kí tự"
                                                            maxLength={50}
                                                            titleCol={24}
                                                            inputCol={24}
                                                        />
                                                    </Col>

                                                    <Col span={24}>
                                                        <Button
                                                            onClick={() =>
                                                                handleResendOTP(
                                                                    formikProps
                                                                        .values
                                                                        .username
                                                                )
                                                            }
                                                            type="primary"
                                                            block
                                                            disabled={
                                                                counter > 0
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            Gửi lại OTP{' '}
                                                            {`${
                                                                counter > 0
                                                                    ? `sau ${counter}`
                                                                    : ''
                                                            }`}
                                                        </Button>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Button
                                                            onClick={() =>
                                                                handleconfirmOTP(
                                                                    formikProps
                                                                        .values
                                                                        .otpValue
                                                                )
                                                            }
                                                            htmlType="submit"
                                                            type="primary"
                                                            block
                                                        >
                                                            Xác thực
                                                        </Button>
                                                    </Col>
                                                </>
                                            ) : (
                                                <>
                                                    <Col span={24}>
                                                        <FastField
                                                            name="phoneNumber"
                                                            component={
                                                                InputField
                                                            }
                                                            type="phone"
                                                            title="Số điện thoại "
                                                            placeholder="Ví dụ: 0123456789"
                                                            maxLength={50}
                                                            titleCol={24}
                                                            inputCol={24}
                                                        />
                                                    </Col>

                                                    <Col span={24}>
                                                        <Button
                                                            htmlType="submit"
                                                            type="primary"
                                                            block
                                                        >
                                                            Đăng ký
                                                        </Button>
                                                    </Col>
                                                </>
                                            )}
                                            {isSubmit ? (
                                                <></>
                                            ) : (
                                                <>
                                                    <div className="card bg-light">
                                                        <div className="card-body d-flex justify-content-center">
                                                            <div id="recaptcha-container"></div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </Row>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                    <Divider>Hoặc</Divider>
                    <div className="addtional-link">
                        <Link to="/">Đăng nhập</Link>
                        <Link to="/forgot">Quên mật khẩu?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneLogin;
