import React from 'react';
import { Row, Col, Form, Input, Button, message, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { requestTransaction } from '../Services/request';

const Transaction: React.FC = () => {
    const navigate = useNavigate();

    async function onFinishTransaction(values: { username: string, value: number }) {
        try {
            await requestTransaction('transactions', { username: values.username, value: values.value });
            window.location.reload();
            navigate("/home");
        } catch (error) {
            message.error('Value invalid or insufficient balance')
        }  
    }

    return (
      <Row
        justify="center"
        align="middle"
        style={{
          textAlign: "center",
        }}
      >
        <h1>Transaction</h1>
        <Col span={12}>
          <Form
            name="transaction"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinishTransaction}
          >
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>

            <Form.Item label="Value" name="value">
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Transaction
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
};

export default Transaction;