import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UserService } from '../../services/users.service';
import { authenticatedRoutesConstant, notificationMessage } from '../../util/constant';

const { Text } = Typography;

const AddEditUser = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [editUsers, setEditUsers] = useState(false);

    useEffect(() => {
        if (params?.id) {
            setEditUsers(params?.id);
            editUserByIdCallback(params?.id);
        }
    }, [params?.id]);

    const addUserCallback = async (values) => {
        setLoading(true);
        const { ok } = await UserService.register(values);
        setLoading(false);
        form.resetFields();
        if (ok) {
            notificationMessage('Add user successfully');
            navigate(authenticatedRoutesConstant.User);
        }
    }

    const editUserByIdCallback = async (id) => {
        setLoading(true);
        const { ok, data } = await UserService.getUsersById(id);
        if (ok) {
            const { results = null } = data;
            setEditUsers(data?.results);
            if (results) {
                form.setFieldsValue({
                    username: results?.username,
                    user_firstname: results?.user_firstname,
                    user_lastname: results?.user_lastname,
                    email: results?.email,
                });
            }
        }
        setLoading(false);
    };

    const updateUserCallback = async (values) => {
        setLoading(true);
        const { ok } = await UserService.updateUserByID(params?.id, values);
        setLoading(false);
        form.resetFields();
        if (ok) {
            notificationMessage('update user successfully');
            navigate(authenticatedRoutesConstant.User);
        }
    }
    const onFinish = async (values) => {
        if (params?.id) {
            updateUserCallback(values);
        } else {
            addUserCallback(values);
        }
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

                {params?.id ? null : <Text>Password</Text>}
                {params?.id ? null : <Form.Item
                    name="password"

                >
                    <Input.Password placeholder="Password" />
                </Form.Item>}

                {params?.id ? null : <Text>Confirm Password</Text>}
                {params?.id ? null : <Form.Item
                    name="c_password"

                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {params?.id ? 'Update' : 'Create'} User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEditUser;