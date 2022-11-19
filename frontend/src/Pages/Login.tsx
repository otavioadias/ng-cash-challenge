import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { useAuth } from '../Contexts/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    async function onFinishLogin(values: {username: string, password: string}) {
            await auth.authenticate(values.username, values.password);
            navigate("/home");
            window.location.reload();
    }

    return (
      <section className="Form">
      <Row
      justify="center"
      align="middle"
      style={{ 
          textAlign: 'center',
          height: '100vh'
      }}
      className="loginForm"
      >
          <h1>Login</h1>
          <Col span={12}>
              <Form
                name='username'
                labelCol={{ span: 8 }}
                wrapperCol={{span: 16 }}
                onFinish={onFinishLogin}
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
                          Log In
                      </Button>
                  </Form.Item>
              </Form>
          </Col>
          <button
            type='button'
            onClick={() => navigate("/register")}
          >
              Create new account
          </button>
      </Row>   
     </section>
    );
};

export default Login;