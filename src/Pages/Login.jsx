import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import { useAuth } from "../contexts";

const Login = () => {
    const navigate = useNavigate();
    const onSuccess = ({ data }) => {
        localStorage.setItem("accessToken", data.tokens.access.token);
        localStorage.setItem("refreshToken", data.tokens.refresh.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
    };
    const { mutate } = useMutation("login", (values) => login(values), {
        onSuccess,
    });
    const onFinish = async (values) => {
        await mutate(values);
    };

    return (
        <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "100vh" }}
        >
            <Col>
                <Typography.Title level={2}>Login</Typography.Title>
                {/* login form with email and pass */}
                <Form onFinish={onFinish}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                            {
                                type: "email",
                                message: "Please input a valid email!",
                            },
                        ]}
                        id="email"
                        name="email"
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        id="password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                            {
                                min: 8,
                                max: 16,
                                message:
                                    "Password must be between 8 and 16 characters!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            style={{ width: "100%" }}
                            type="primary"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <Row justify="space-between">
                    <Typography.Paragraph>
                        <Space>
                            Do Not have an account?
                            <Link to="/signup">Sign Up</Link>
                        </Space>
                    </Typography.Paragraph>
                </Row>
            </Col>
        </Row>
    );
};

export default Login;
