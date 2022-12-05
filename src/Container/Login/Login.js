import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { authenticatedRoutesConstant, unAuthenticatedRoutesConstant, userInfo } from "../../util/constant";
import "./Login.less";
import { UserService } from "../../services/users.service";

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        //console.log("Success:", values);
        setLoading(true);
        const {ok, data} = await UserService.login(values);
        if (ok) {
            localStorage.setItem(userInfo.TOKEN, data?.results?.token);
            localStorage.setItem(userInfo.USERNAME, data?.results?.username);
            window.location.href = authenticatedRoutesConstant.Categories;
        }
        setLoading(false);
    };
    return (
        <div className="custom-login-container">
            <Title level={2} className="custom-heading-login">
                Login
            </Title>
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                className="custom-form-container"
            >
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
                <Text>
                    or <Link to={unAuthenticatedRoutesConstant.Register}>Signup</Link>
                </Text>
            </Form>
        </div>
    );
}

export default Login;
