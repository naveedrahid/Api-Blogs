import { Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { UserService } from "../../services/users.service";
import { authenticatedRoutesConstant, userInfo } from "../../util/constant";
import "./Register.less";

const { Title, Text } = Typography;
function Register() {
    
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        const payload = {
            username: values.username,
            user_firstname: values.firstName,
            user_lastname: values.lastName,
            email: values.email,
            password: values.password,
            c_password: values.password,
        };
        
        const { ok, data } = await UserService.register(payload);
        if (ok) {
            localStorage.setItem(userInfo.TOKEN, data?.results?.token);
            localStorage.setItem(userInfo.USERNAME, data?.results?.username);
            window.location.href = authenticatedRoutesConstant.Categories;
        }
        setLoading(false);
    };
    return (
        <div className="custom-register-container">
            <Title level={2} className="custom-heading-register">
                Register
            </Title>
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                className="custom-form-container"
            >
                <Text>First Name</Text>
                <Form.Item
                    name="firstName"
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
                    name="lastName"
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

                <Text>Password</Text>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;