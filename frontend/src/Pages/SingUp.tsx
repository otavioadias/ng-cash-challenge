import React from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { useAuth } from '../Contexts/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    async function onFinishRegistration(values: {username: string, password: string}) {
        try {
            await auth.registration(values.username, values.password);
            navigate("/home");
        } catch (err) {
            message.error('Incorrect format of username and password')
        }
    }

    return (
     <Row
     justify="center"
     align="middle"
     style={{ 
        textAlign: 'center',
        height: '100vh'
    }}
     >
        <h1>Register</h1>
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
                    <Input />
                </Form.Item>

                <Form.Item
                  label='Password'
                  name='password'
                >
                    <Input.Password />
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
     </Row>   
    );
};

export default Register;