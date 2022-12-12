import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useParams } from 'react-router-dom';

const { Text } = Typography;

const AddEditPost = () => {
    
    const [form] = Form.useForm();
    const params = useParams();
    const [loading, setLoading] = useState(false);

    const onFinish = (values)=>{
        console.log(values);
     }
    return (
        <div className="add-category-container">
            <h2>{params?.id ? 'Edit' : 'Create'} User</h2>

            <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
                <Text>First Name</Text>
                <Form.Item
                    name="user_firstname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your First Name!",
                        },
                    ]}
                >
                    <Input placeholder="First Name" />
                </Form.Item>

                <Text>Last Name</Text>
                <Form.Item
                    name="user_lastname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your last name!",
                        },
                    ]}
                >
                    <Input placeholder="Last Name" />
                </Form.Item>

                <Text>Username</Text>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                <Text>Email</Text>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {params?.id ? 'Update' : 'Create'} User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEditPost;
