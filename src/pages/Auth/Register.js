

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/thunk/UserThunk';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, error } = useSelector((state) => state.user);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const  payload  = await dispatch(registerUser(values));
            console.log(payload);

            if (payload.status!==200) {
                console.log("Error");
            } else {
                navigate('/dashboard'); // Redirect to dashboard on successful registration
            }

            setSubmitting(false);
        } catch (error) {
            // Handle errors
            console.error('An error occurred during form submission:', error);
            setSubmitting(false);
        }
    };

    if (user) {
        navigate('/dashboard'); // Redirect if the user is already logged in
    }

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Col span={8}>
                <h1>Register</h1>
                {isLoading ? <pre>Loading...</pre> : error ? <pre>{error}</pre> : null}
                <Formik
                    initialValues={{name: '', email: '', contactNumber: '', companyName: '', password: ''}}
                    validate={(values) => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        if (!values.email) {
                            errors.email = 'Required';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Field as={Input} type="text" name="name" placeholder="Name"/>
                                    <ErrorMessage name="name" component="div" style={{color: 'red'}}/>
                                </Col>
                                <Col span={24}>
                                    <Field as={Input} type="email" name="email" placeholder="Email"/>
                                    <ErrorMessage name="email" component="div" style={{color: 'red'}}/>
                                </Col>
                                {/*<Col span={24}>*/}
                                {/*    <Field as={Input} type="text" name="contactNumber" placeholder="Contact Number" />*/}
                                {/*    <ErrorMessage name="contactNumber" component="span"  style={{ color: 'red' }} />*/}
                                {/*</Col>*/}
                                {/*<Col span={24}>*/}
                                {/*    <Field as={Input} type="text" name="passwrd" placeholder="Password" />*/}
                                {/*    <ErrorMessage name="companyName" component="div"  style={{ color: 'red' }} />*/}
                                {/*</Col>*/}
                                <Col span={24}>
                                    <Field as={Input.Password} type="password" name="password" placeholder="Password"/>
                                    <ErrorMessage name="password" component="div" style={{color: 'red'}}/>
                                </Col>
                                <Col span={24}>
                                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                                        Register
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
                <pre>
                    Already have an account?{' '}
                <Button type="link" onClick={() => navigate('/login')}>
                    Login
                </Button>
            </pre>
            </Col>

        </Row>
    );
};

export default Register;
