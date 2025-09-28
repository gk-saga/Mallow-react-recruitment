import React from 'react';
import {
    LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Popconfirm, Space, theme, Typography } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/authSlice';
import type { AppDispatch } from '../redux';
import { useDispatch } from 'react-redux';
const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
    const navigate = useNavigate();
     const dispatch = useDispatch<AppDispatch>();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const handleLogout = async () => {
        await dispatch(logout())
        navigate("login")
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <Header style={{
                    padding: "0 16px",
                    background: '#001529',
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}>
                    <Space size="middle">
                        <Typography.Text style={{ color: "white" }}>
                            Elon Musk
                        </Typography.Text>
                        <Popconfirm
                            title="Are you sure you want to logout?"
                            onConfirm={handleLogout} 
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                icon={<LogoutOutlined />}
                            />
                        </Popconfirm>

                    </Space>
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
