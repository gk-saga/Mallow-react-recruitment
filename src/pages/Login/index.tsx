import React, { useEffect } from 'react';
import { Form, Input, Button, Card, message, Spin, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../redux';
import { login } from '../../redux/slice/authSlice';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, token } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: { email: string; password: string; remember: boolean }) => {
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
      <Card style={{ width: 400, textAlign: "center" }}>
        <Spin spinning={loading} tip="Logging in...">
          <Form
            name="login"
            layout="vertical"
            initialValues={{ email: 'eve.holt@reqres.in', password: 'cityslicka', remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            {/* Remember Me Checkbox */}
            <Form.Item name="remember" valuePropName="checked" style={{textAlign:'left'}}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item style={{marginBottom:0}}>
              <Button type="primary" htmlType="submit" block loading={loading}>
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
