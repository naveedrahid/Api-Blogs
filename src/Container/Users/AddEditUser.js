import { Button, Form, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserService } from '../../services/users.service';
import { authenticatedRoutesConstant } from '../../util/constant';

const { Text } = Typography;

const AddEditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // const [editUsers, setEditUsers] = useState(null);

    useEffect(() => {
        if (id) {
            editUserByIdCallback();
        }
    }, [id]);

    const addUserCallback = async (values) => {
        setLoading(true);
        const { ok } = await UserService.register(values);
        console.log(ok, 'add user');
        setLoading(false);
        form.resetFields();
        if (ok) {
            navigate(authenticatedRoutesConstant.User);
        }
    }

    const editUserByIdCallback = async () => {
        setLoading(true);
        const { ok, data } = await UserService.getUsersById(id);
        if (ok) {
            const { results = null } = data;
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

    const onFinish = async (values) => {
        if (id) {
            editUserByIdCallback(values);
        } else {
            addUserCallback(values);
        }
    }
    return (
        <div className="add-category-container">
            <h2>{id ? 'Edit' : 'Create'} User</h2>

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

                {
                    id ? null :
                        <Text>Password</Text>
                }
                {
                    id ? null :
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: id ? false : true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                }
                {
                    id ? null :
                        <Text>Confirm Password</Text>
                }
                {id ? null :
                    <Form.Item
                        name="c_password"
                        rules={[
                            {
                                required: id ? false : true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                }

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {id ? 'Update' : 'Create'} User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEditUser;