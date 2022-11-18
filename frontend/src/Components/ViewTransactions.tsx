import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table, Radio, RadioChangeEvent, DatePickerProps, Space, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ITransferUser, requestFilter } from '../Services/request';
import type { ColumnsType } from 'antd/es/table';

const ViewTransactions: React.FC = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState(Array<ITransferUser>);
    const [view, setView] = useState(false);
    const [filter, setFilter] = useState('All');
    const [filterDate, setFilterDate] = useState('empty');
    const [date, setDate] = useState(String);

    useEffect(() => {
      const apiAll = '/transactions';
      getTransactionsFilter(apiAll, 'empty');
    }, [])

    useEffect(() => {
      const apiDate = '/transactions/date';
      const apiAll = '/transactions';
      const apiCashOut = '/transactions/debited';
      const apiCashIn = '/transactions/credited';
      switch (filter || filterDate) {
      case 'Date':
        getTransactionsFilter(apiDate, date);
        break;
      case 'Cash-out':
        getTransactionsFilter(apiCashOut, date);
        break;
      case 'Cash-in':
          getTransactionsFilter(apiCashIn, date);
          break;
      default:
        getTransactionsFilter(apiAll, 'empty');
        break;
      }
    }, [filter, date, filterDate]);

    async function getTransactionsFilter(endpoint: string, date: string) {
      if (date === 'empty') {
        const transactions = await requestFilter(endpoint, null);
        return setTransactions(transactions);
      }
      console.log(date);
      const transactions = await requestFilter(endpoint, date as string);
      setTransactions(transactions);
    }
    async function viewTransaction() {
        if(view === true) {
          setView(false);
        }
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
      setFilterDate('empty');
    };

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
      setDate(dateString);
      setFilterDate('Date');
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
                {<h3>Filters of transactions</h3>}
                <Radio.Group options={options} onChange={onChange} value={filter} optionType="button"/>
                <Space direction="horizontal">
                  <DatePicker name="date" onChange={onChangeDate} />
                </Space>
                < br/>
                < br/>
                < br/>
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