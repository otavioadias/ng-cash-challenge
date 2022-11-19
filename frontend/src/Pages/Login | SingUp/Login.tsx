import React from 'react';
import './index.css'
import { Row, Col, Form, Input, Button, message } from 'antd';
import { useAuth } from '../../Contexts/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    async function onFinishLogin(values: {username: string, password: string}) {
      try {
        await auth.authenticate(values.username, values.password);
        navigate("/home");
        window.location.reload();
      } catch (err) {
        message.error("Incorrect format of username and password");
      }
    }

    return (
      <section className="container">
      <img src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt="Logo NG.CASH" className="logo is-hidden-touch"></img>
      <Row>
      <img src="https://cdn.discordapp.com/attachments/938669134890278937/1043593978722930819/20221119_145953_0001-removebg-preview.png" alt="Logo NG.CASH Login" className="logoLogin"></img>
          <Col span={12}>
              <Form
                name='username'
                labelCol={{ span: 8 }}
                wrapperCol={{span: 16 }}
                onFinish={onFinishLogin}
              >
                  <Form.Item
                    label="Username"
                    name='username'
                  >
                      <Input placeholder="Username"/>
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name='password'
                  >
                      <Input.Password placeholder="Password" />
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