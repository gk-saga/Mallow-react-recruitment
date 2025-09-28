import React, { useEffect } from "react";
import { Drawer, Form, Input, Button, Space } from "antd";

interface UserDrawerProps {
  open: boolean;
  mode: "add" | "edit";
  initialValues?: any;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const CreateUpdateDrawer: React.FC<UserDrawerProps> = ({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
      <Drawer
        title={mode === "add" ? "Create User" : "Edit User"}
        width={400}
        onClose={onClose}
        open={open}
        styles={{
    body: { paddingBottom: 80 },
  }}
      >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
      name="avatar"
      label="Profile Image URL"
      rules={[
        { required: true, message: "Please enter profile image URL" },
        { type: "url", message: "Enter a valid URL" },
      ]}
    >
      <Input placeholder="https://example.com/profile.jpg" />
    </Form.Item>

        <Space style={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {mode === "add" ? "Create" : "Update"}
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default CreateUpdateDrawer;
