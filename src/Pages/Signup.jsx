import {
    Button,
    Col,
    Form,
    Input,
    message,
    Row,
    Space,
    Typography,
} from "antd";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";

const Signup = () => {
    const naviagte = useNavigate();
    const onSuccess = () => {
        message.info("Signup successful! Please login with the same creds");
        naviagte("/login");
    };

    const { data, mutate, isSuccess } = useMutation(
        "signup",
        (values) => signup(values),
        {
            onSuccess,
        }
    );
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
                <Typography.Title level={2}>Signup</Typography.Title>
                <Form onFinish={onFinish}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                        name="name"
                        id="name"
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        id="email"
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
                    >
                        <Input placeholder="Email" type="email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        id="password"
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
                            {
                                pattern: new RegExp(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                                ),
                                message:
                                    "Password must be atleast 8 characters long, contain atleast one lowercase, one uppercase, one number, and one special character",
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
                            Signup
                        </Button>
                    </Form.Item>
                </Form>

                <Row justify="space-between">
                    <Typography.Paragraph>
                        <Space>
                            Already have an account?
                            <Link to="/login">Log in</Link>
                        </Space>
                    </Typography.Paragraph>
                </Row>
            </Col>
        </Row>
    );
};

export default Signup;
