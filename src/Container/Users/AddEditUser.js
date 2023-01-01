import React, { useEffect, useState } from 'react';
import { Button, Form, Input, notification, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UserService } from '../../services/users.service';
import { authenticatedRoutesConstant } from '../../util/constant';
import CustomUpload from '../../fileUpload/customUpload';

const { Text } = Typography;

const AddEditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [editUsers, setEditUsers] = useState(false);
    const [file, setFile] = useState(null);
    const user_id = id;

    useEffect(() => {
        if (user_id) {
           setEditUsers(user_id);
            editUserByIdCallback(user_id);
        }
    }, [user_id]);

    const editUserByIdCallback = async (user_id) => {
        setLoading(true);
        const { ok, data } = await UserService.getUsersById(user_id);
        if (ok) {
            const singleUser = data?.results;
            form.setFieldsValue({
                username: singleUser.username,
                user_firstname: singleUser.user_firstname,
                user_lastname: singleUser.user_lastname,
                email: singleUser.email,
                password: singleUser.password,
                c_password: singleUser.c_password
            });

            setEditUsers(singleUser);
        }
        setLoading(false);
    };
    // const updateUsersByIdHandler = async (values) => {
    //     const { ok} = await UserService.updateUserByID(user_id, values);
    //     if (ok) {
    //         notification.success('update user successfully');
    //     }
    // }
    const onFinish = async (values) => {
        setLoading(true);    
        const payload = new FormData();
        payload.append("username", values.username);
        payload.append("user_firstname", values.firstName);
        payload.append("user_lastname", values.lastName);
        payload.append("email", values.email);
        payload.append("password", values.password);
        payload.append("c_password", values.password);
        payload.append("user_image", file);
    
        let okResponse = null;
        if (user_id) {
          const { ok } = await UserService.updateUserByID(user_id, payload);
          okResponse = ok;
        } else {
          const { ok } = await UserService.register(payload);
          okResponse = ok;
        }
    
        if (okResponse) {
          navigate(authenticatedRoutesConstant.User);
        }
    
        setLoading(false);
      };
    
    // const onFinish = async (values) => {
    //     setLoading(true);
    //     const payload = new FormData();
    //     //console.log(payload);
    //     payload.append("username", values.username);
    //     payload.append("user_firstname", values.user_firstname);
    //     payload.append("user_lastname", values.user_lastname);
    //     payload.append("email", values.email);
    //     payload.append("password", values.password);
    //     payload.append("c_password", values.c_password);
    //     if (file) {
    //         payload.append("user_image", file);
    //       }

    //     let okResponse = null;
    //     if (user_id) {
    //         await updateUsersByIdHandler(payload);
    //         // if (ok)
    //         //     notification.success('update user successfully');
    //         //okResponse = ok;
    //     } else {
    //         const { ok } = await UserService.register(payload);
    //         // if (ok)
    //         //     notification.success('Add user successfully');
    //         okResponse = ok;
    //     }
    //     if (okResponse) {
    //         navigate(authenticatedRoutesConstant.User);
    //     }
    //     setLoading(false);
    // }
    const customRequestCallback = (info) => {
        setFile(info?.file);

    }

    return (
        <div className="add-category-container">
            <h2>{user_id ? 'Edit' : 'Create'} User</h2>

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

                {user_id ? null : <Text>Password</Text>}
                {user_id ? null : <Form.Item
                    name="password"

                >
                    <Input.Password placeholder="Password" />
                </Form.Item>}

                {user_id ? null : <Text>Confirm Password</Text>}
                {user_id ? null : <Form.Item
                    name="c_password"

                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>}
                <Form.Item>
                    <CustomUpload customRequestCallback={customRequestCallback} />

                    {editUsers?.user_image ? (
                        <img
                            src={editUsers?.user_image}
                            alt={editUsers?.username}
                            width={100}
                            style={{ marginTop: 20 }}
                        />
                    ) : (
                        <>{user_id && <p>No Image Found</p>}</>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {user_id ? 'Update' : 'Create'} User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEditUser;