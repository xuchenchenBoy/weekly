import React from 'react';
import { Form, Row, Col, Button, DatePicker, Table, Pagination } from 'antd';
import Separate from '@/components/Separate';

const { RangePicker } = DatePicker;

class AllArticleList extends React.PureComponent {
  formRef = React.createRef();

  state = {
    currentPage: 1,
    total: 0,
  };

  onChangePage = page => {};

  render() {
    const { currentPage, total } = this.state;
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    return (
      <div>
        <Form layout="inline" ref={this.formRef} className="search-bar">
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="searchTime" label="创建时间">
                <RangePicker placeholder={['开始时间', '结束时间']} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              style={{
                textAlign: 'right',
              }}
            >
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={() => {
                  this.formRef.current.resetFields();
                }}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
        <Separate />
        <Table
          className="table-list"
          pagination={false}
          dataSource={dataSource}
          columns={columns}
        />
        <Separate />
        <Pagination
          className="pagination"
          current={currentPage}
          onChange={this.onChangePage}
          total={total}
        />
      </div>
    );
  }
}

export default AllArticleList;
