import React, { useEffect } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../redux';
import { login } from '../../redux/slice/authSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, token } = useSelector((state: RootState) => state.auth);
  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await dispatch(login(values) as any).unwrap();
      message.success('Login successful!');
    } catch (err: any) {
      message.error(err || 'Login failed!');
    } finally {
      navigate('/');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);


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
        <Spin spinning={loading} tip="Logging in...">
          <Form
            name="login"
            layout="vertical"
            initialValues={{ email: 'eve.holt@reqres.in', password: 'cityslicka' }}
            onFinish={onFinish}
          >
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default Login;
