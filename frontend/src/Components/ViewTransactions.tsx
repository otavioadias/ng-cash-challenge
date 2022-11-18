import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ITransferUser, requestData } from '../Services/request';
import type { ColumnsType } from 'antd/es/table';


const ViewTransactions: React.FC = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState(Array<ITransferUser>);
    const [view, setView] = useState(false);

    useEffect(() => {
      getTransactions();
    }, [])

    async function getTransactions() {
      const transactions = await requestData('transactions');
      setTransactions(transactions);
  }

    async function viewTransaction() {
        if(view === true) {
          setView(false);
        }
        setView(true);
        navigate("/home");
    }

    const columns: ColumnsType<ITransferUser> = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "DebitedAccountId",
        dataIndex: "debitedAccountId",
      },
      {
        title: 'CreditedAccountId',
        dataIndex: "creditedAccountId",
      },
      {
        title: 'Value',
        dataIndex: "value",
      },
      {
        title: 'CreatedAt',
        dataIndex: "createdAt",
      },
    ];

    return (
      <section>
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
              onFinish={viewTransaction}
            >
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  View|Hide All Transactions
                </Button>
              </Form.Item>
            </Form>
          </Col>
          {view === true && (
            <Table<ITransferUser>
              dataSource={transactions}
              columns={columns}
              rowKey={() => Math.random()}
            />
          )}
        </Row>
      </section>
    );
};

export default ViewTransactions;