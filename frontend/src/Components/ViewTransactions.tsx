import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table, Radio, RadioChangeEvent, DatePickerProps, Space, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ITransferUser, requestData } from '../Services/request';
import type { ColumnsType } from 'antd/es/table';

const ViewTransactions: React.FC = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState(Array<ITransferUser>);
    const [view, setView] = useState(false);
    const [filter, setFilter] = useState('All');
    const [date, setDate] = useState<string | undefined>();

    useEffect(() => {
      const apiAll = '/transactions';
      requestData(apiAll);
    }, [])

    useEffect(() => {
      const apiAll = '/transactions';
      const apiCashOut = '/transactions/debited';
      const apiCashIn = '/transactions/credited';
      switch (filter) {
      case 'Cash-out':
        getTransactionsFilter(apiCashOut,date);
        break;
      case 'Cash-in':
        getTransactionsFilter(apiCashIn,date);
        break;
      default:
        getTransactionsFilter(apiAll, date)
        break;
      }
    }, [filter, date]);

    async function getTransactionsFilter(endpoint: string, date: string | undefined) {
      if (date !== undefined) {
        console.log(date);
        const transactions = await requestData(`${endpoint}?date=${date}`);
        return setTransactions(transactions);
      }
      const transactions = await requestData(endpoint);
      setTransactions(transactions);
    }

    async function viewTransaction() {
        setView(true);
        navigate("/home");
    }

    // Colunas da tabela
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

    // Radios usados para filtragem
    const options = [
      { label: 'All', value: 'All' },
      { label: 'Cash-in', value: 'Cash-in' },
      { label: 'Cash-out', value: 'Cash-out' },
    ];

    const onChange = ({ target: { value } }: RadioChangeEvent) => {
      setFilter(value);
      setDate(undefined);
    };

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
      setDate(dateString);
      console.log(date, dateString);
    };

    return (
      <section>
        <Row
          justify="center"
          align="middle"
          style={{
            textAlign: "center",
          }}
        >
          <h1>Transactions</h1>
          <Col span={12}>
            <Form
              name="transaction"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={viewTransaction}
            >
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  View Transactions
                </Button>
                <section className="filters">
                  <h3>Filters</h3>
                  <Radio.Group options={options} onChange={onChange} value={filter} optionType="button"/>
                  <Space direction="vertical">
                    <DatePicker name="date" onChange={onChangeDate} />
                  </Space>
                </section>
              </Form.Item>
            </Form>
          </Col>
          <section className="tableTransactions">
            {view === true ? (
              <Table<ITransferUser>
                dataSource={transactions}
                columns={columns}
                rowKey={() => Math.random()}
              />
            ) : (
              <></>
            )}
          </section>
        </Row>
      </section>
    );
};

export default ViewTransactions;