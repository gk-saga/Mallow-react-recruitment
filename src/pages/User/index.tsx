import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Input, Avatar, Row, Col, Card, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux";
import { addUser, editUser, getUsers, removeUser } from "../../redux/slice/userSlice";
import { AppstoreOutlined, DeleteOutlined, EditOutlined, PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import CreateUpdateDrawer from "./CreateUpdateDrawer";


const { Search } = Input;

const Users: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading } = useSelector((state: RootState) => state.user);
    const [searchText, setSearchText] = useState("");

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const [viewMode, setViewMode] = useState<"list" | "card">("list");
    const { Title } = Typography;

    useEffect(() => {
        dispatch(getUsers(1));
    }, [dispatch]);

    const handleAdd = () => {
        setDrawerMode("add");
        setSelectedUser(null);
        setDrawerOpen(true);
    };

    const handleEdit = (user: any) => {
        setDrawerMode("edit");
        setSelectedUser(user);
        setDrawerOpen(true);
    };
    const handleDelete = async (id: number) => {
        try {
            await dispatch(removeUser(id)).unwrap();
            message.success("User deleted successfully");
        } catch (error) {
            message.error("Failed to delete user");
        }
    };

    const handleSearch = (value: string) => {
        setSearchText(value.toLowerCase());
    };

    const filteredUsers = users.filter((user: any) => {
        const firstName = user.first_name || "";
        const lastName = user.last_name || "";
        const email = user.email || "";

        const fullName = `${firstName} ${lastName}`.toLowerCase();
        const emailLower = email.toLowerCase();

        return fullName.includes(searchText) || emailLower.includes(searchText);
    });


    const columns = [
        {
            title: "",
            dataIndex: "avatar",
            key: "avatar",
            render: (_: string, record: any) => (
                <Avatar src={record.avatar} alt={record.first_name} size={50}>
                    {record.first_name[0]}
                </Avatar>
            ),
        },
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "First Name",
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "Last Name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        variant="solid"
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger type="primary" variant="filled">
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>

            <Row justify="space-between" align="middle" style={{ marginBottom: 16, gap: 10, alignItems: 'center' }}>
                <Col>
                    <Title level={4} style={{ margin: 0 }}>Users</Title>
                </Col>
                <Col style={{ display: 'flex', gap: 10 }}>
                    <Search
                        placeholder="Input search text"
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                        allowClear
                        enterButton
                        style={{ maxWidth: 250 }}
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Create User
                    </Button>
                </Col>
            </Row>
            <Row justify="start" style={{ marginBottom: 16 }}>
                <Space>
                    <Button
                        type={viewMode === "list" ? "primary" : "default"}
                        icon={<UnorderedListOutlined />}
                        onClick={() => setViewMode("list")}
                    >
                        List
                    </Button>
                    <Button
                        type={viewMode === "card" ? "primary" : "default"}
                        icon={<AppstoreOutlined />}
                        onClick={() => setViewMode("card")}
                    >
                        Card
                    </Button>
                </Space>
            </Row>

            {viewMode === "list" ? (
                <Table
                    size="middle"
                    loading={loading}
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            ) : (
                <Row gutter={[30, 30]} style={{ backgroundColor: '#c9dff1', paddingTop: 15, paddingBottom: 15 }} >
                    {filteredUsers.map((user) => (
                        <Col xs={24} sm={24} md={8} key={user.id}>
                            <div className="user-card">
                                <Card
                                    hoverable
                                    cover={
                                        <Avatar
                                            src={user.avatar}
                                            size={120}
                                            style={{
                                                margin: "20px auto 10px auto", display: "block",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        >
                                            {user.first_name[0]}
                                        </Avatar>
                                    }
                                    style={{
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                                        borderRadius: "10px",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                    }}
                                >
                                    <Card.Meta
                                        title={
                                            <Title level={3} style={{ textAlign: "center", marginBottom: 0 }}>
                                                {`${user.first_name} ${user.last_name}`}
                                            </Title>
                                        }
                                        description={
                                            <div style={{ textAlign: "center", margin: 'auto', fontSize: '20px' }}>
                                                {user.email}
                                            </div>
                                        }
                                    />
                                </Card>

                                <div className="user-card-overlay">
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<EditOutlined style={{ fontSize: 20 }} />}
                                        onClick={() => handleEdit(user)}
                                        size="large"
                                    />
                                    <Popconfirm
                                        title="Are you sure to delete this user?"
                                        onConfirm={() => handleDelete(user.id)}
                                    >
                                        <Button
                                            danger
                                            type="primary"
                                            shape="circle"
                                            icon={<DeleteOutlined style={{ fontSize: 20 }} />}
                                            size="large"
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

            )}

            <CreateUpdateDrawer
                open={drawerOpen}
                mode={drawerMode}
                initialValues={selectedUser}
                onClose={() => setDrawerOpen(false)}
                onSubmit={(values) => {
                    if (drawerMode === "add") {
                        dispatch(addUser(values));
                        message.success("User created successfully");
                    } else {
                        dispatch(editUser({ id: selectedUser.id, data: values }));
                        message.success("User updated successfully");
                    }
                    setDrawerOpen(false);
                }}
            />
        </div>
    );
};

export default Users;
