import React, { useEffect, useState } from 'react';
import { Card, Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import userActions from '../redux/actions/UserAction';
import { accessTokenLoginUser } from '../redux/thunk/UserThunk';

const Home = () => {
    const [token, setToken] = useState('');
    const { user } = useSelector((state) => state.user);
    const [userApi, setUserApi] = useState(user);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log(token);


        if (token) {
            localStorage.setItem('token', token);
            const tokLogin = async () => {
                setLoading(true);
                try {
                    const response = await userActions.tokenLogin(token);
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    dispatch(accessTokenLoginUser(token));
                    setUserApi(response.data.data);
                } catch (error) {
                    console.error('Failed to login with token:', error);
                } finally {
                    setLoading(false);
                }
            };
            tokLogin();
            setToken(token);
        } else {
            setLoading(false);
        }
    }, [dispatch]);

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <div style={{ margin: 'auto' }}>
            <Card title="User Information" bordered={false} style={{ width: 300 }}>
                <p><strong>Name:</strong> {user?.displayName}</p>
                <p><strong>Email:</strong> {user?.emailId}</p>
                <p><strong>Role:</strong> {user?.role}</p>
                <p><strong>Visibility:</strong> {user?.visiblity}</p>
            </Card>
            <Button onClick={() => navigate('/staff/home')} style={{ marginTop: '20px' }}>
                Dashboard
            </Button>
        </div>
    );
};

export default Home;
