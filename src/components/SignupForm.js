import { useState } from "react";
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

export function SignupForm({
    submitFormAction,
    passwordAutocomplete,
    error = null,
}) {
    const [formState, setFormState] = useState({ name: "", email: "", password: "", role: "donor" });
    const [form] = Form.useForm();

    const handleFormState = (event) => {
        if (event.label === 'donor' || event.label === 'donee') {
            setFormState({ ...formState, 'role': event.value });
        } else {
            setFormState({ ...formState, [event.target.name]: event.target.value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitFormAction(formState);
    };

    return (
        <div className="login-form-container">
            <Row type="flex" justify="center" align="middle" style={{ minHeight: '80vh' }}>
                <Col span={4} >
                    <h1 className="login-h1">Sign up</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true, }}
                        form={form}
                        layout="vertical"
                    >
                        {error && <p style={{ color: "red" }}>{error.message}</p>}
                        <Form.Item
                            label="Are you donor or donee?"
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select donor or donee!',
                                },
                            ]}
                        >
                            <Select labelInValue onChange={handleFormState}>
                                <Select.Option name="role" value="donor">donor</Select.Option>
                                <Select.Option name="role" value="donee">donee</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Name:"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                type="text"
                                name="name"
                                autoComplete="name"
                                placeholder="Name"
                                value={formState.name}
                                onChange={handleFormState}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email:"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Email"
                                value={formState.email}
                                onChange={handleFormState}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password:"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                name="password"
                                autoComplete={passwordAutocomplete}
                                placeholder="Password"
                                value={formState.password}
                                onChange={handleFormState}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{
                                    background: '#DAB88B', borderColor: '#DAB88B', display: 'block',
                                    width: '100 %'
                                }}
                                onClick={handleSubmit}
                            >
                                Sign up
                            </Button>
                            Or <a style={{ color: '#DAB88B' }} href="/login">login now!</a>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}