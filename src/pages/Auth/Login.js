import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser  } from '../../redux/thunk/UserThunk';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user , isLoading, error} = useSelector((state) => state.user);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const  payload  = await dispatch(loginUser(values));
            console.log(payload)
           if(error){
                console.log(error)
           }
            setSubmitting(false);

        } catch (error) {
            // Handle errors
            console.error('An error occurred during form submission:', error);
            setSubmitting(false);
        }
    };

    if(user){
        navigate('/dashboard');
    }

    const googleLoginUser = async () => {
        try {
            window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
        }
        catch (error) {
            console.error('An error occurred during form submission:', error);
        }
    }

    const githubLogin = async () => {
        try {
            window.open(`${process.env.REACT_APP_API_URL}/auth/github`, "_self");
        }
        catch (error) {
            console.error('An error occurred during form submission:', error);
        }
    }

    return (

        <Row justify="center" align="middle" style={{ height: '100vh' }}>

            <Col span={8}>

                <h1>Login</h1>
                {
                    isLoading ? <pre>Loading...</pre> : error ? <pre>{error}</pre> : null
                }
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={(values) => {
                        const errors = {};
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
                                    <Field as={Input} type="email" name="email" placeholder="Email"/>
                                    <ErrorMessage name="email" component="div"/>
                                </Col>
                                <Col span={24}>
                                    <Field as={Input.Password} type="password" name="password" placeholder="Password"/>
                                    <ErrorMessage name="password" component="div"/>
                                </Col>
                                <Col span={24}>
                                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
                <pre>Don't have an account? <Button onClick={() => navigate('/register')} type="link">Register</Button></pre>
                <pre>Continue with: </pre>
                <div style={{margin: 'auto', width: 'fit-content', padding: '20px'}}>
                    <button onClick={googleLoginUser} className="button" style={{
                        border: 'none',

                    }}>
                        <div className="googlelogo"></div>
                    </button>

                    <button onClick={githubLogin} className="button" style={{
                        marginLeft: '10px',
                        border: 'none',

                    }}>
                        <div className="githublogo"></div>
                    </button>
                </div>
                    {/*<button onClick={githubAuth} className="button">*/}
                    {/*    <div className="githublogo"></div>*/}
                    {/*</button>*/}
            </Col>
        </Row>
);
};

export default Login;
