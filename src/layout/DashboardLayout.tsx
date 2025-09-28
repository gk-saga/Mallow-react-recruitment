import React, { useState } from 'react';
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("login")
    };

    const menuItems = [
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span onClick={handleLogout}>Logout</span>,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" style={{ height: 32, margin: 16, background: '#fff' }} />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => {
                        if (key === '1') navigate('/users');
                    }}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Users',
                        }
                    ]}
                />
            </Sider>

            <Layout>
                <Header style={{
                    padding: "0 16px",
                    background: colorBgContainer,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                        <Button
                            type="text"
                            icon={<UserOutlined />}
                            style={{ fontSize: "16px" }}
                        >
                            Profile
                        </Button>
                    </Dropdown>
                </Header>

                {/* Page Content */}
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet /> {/* Renders child route */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
