// src/pages/Login.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../redux';
import { login } from '../../redux/slice/authSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      console.log("what is happening here");
      await dispatch(login(values)as any).unwrap();
      // message.success('Login successful!');
      
    } catch (err: any) {
      // message.error(err || 'Login failed!');
    } finally {
       console.log("finalyy here");
       navigate('/');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f0f2f5',
      }}
    >
      <Card title="Login" style={{ width: 350 }}>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ email: 'eve.holt@reqres.in', password: 'cityslicka' }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
