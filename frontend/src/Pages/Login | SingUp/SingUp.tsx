import React from 'react';
import './index.css'
import { Row, Col, Form, Input, Button, message } from 'antd';
import { useAuth } from '../../Contexts/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    async function onFinishRegistration(values: {username: string, password: string}) {
        try {
            await auth.registration(values.username, values.password);
            navigate("/home");
            window.location.reload();
        } catch (err) {
            message.error('Incorrect format of username and password')
        }
    }

    return (
    <section className="container">
        <img src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt="Logo NG.CASH" className="logo is-hidden-touch"></img>
        <Row>
            <img src="https://cdn.discordapp.com/attachments/938669134890278937/1043593979079442522/20221119_145953_0000-removebg-preview.png" alt="Logo NG.CASH Login" className="logoLogin"></img>
            <Col span={12}>
                <Form
                name='username'
                labelCol={{span: 8 }}
                wrapperCol={{span: 16 }}
                onFinish={onFinishRegistration}
                >
                    <Form.Item
                    label='Username'
                    name='username'
                    >
                        <Input placeholder="Username"/>
                    </Form.Item>

                    <Form.Item
                    label='Password'
                    name='password'
                    >
                        <Input.Password placeholder="Password"/>
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{offset: 8, span: 16 }}
                    >
                        <Button
                        type='primary'
                        htmlType='submit'
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <button type="button" onClick={() => navigate("/")}>
                Back to Login
            </button>
        </Row>   
     </section>
    );
};

export default Register;