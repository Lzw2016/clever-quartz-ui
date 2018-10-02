import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Input, Select, Button, Table, Cascader, DatePicker } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { StatusArray } from '../../utils/enum';
import { AddressOptions } from '../../utils/address';
// import classNames from 'classnames';
import styles from './Demo01.less';

@connect(({ demo, loading }) => ({
  demo,
  quetyLoading: loading.effects['demo/queryPage'],
}))
@Form.create()
export default class Demo01 extends PureComponent {
  state = {
    screenHeight: document.documentElement.clientHeight,
  };

  // 数据初始化
  componentDidMount() {
    window.addEventListener('resize', this.handleHeight);
    const { dispatch } = this.props;
    dispatch({ type: 'demo/queryPage', payload: { pageNo: 0 } });
  }

  // 卸载组件
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleHeight);
  }

  // 动态设置高度
  handleHeight = () => {
    const screenHeight = document.documentElement.clientHeight;
    console.log('screenHeight', screenHeight);
    this.setState({ screenHeight });
  };

  // 查询数据
  queryPage = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    dispatch({ type: 'demo/queryPage', payload: { ...form.getFieldsValue(), pageNo: 0 } });
  };

  // 表格数据过滤或跳页
  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, demo, form } = this.props;
    form.resetFields();
    const queryParam = {
      ...demo.queryParam,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    // 排序
    if (sorter.field) {
      queryParam.orderField = sorter.field;
      queryParam.sort = sorter.order;
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'demo/queryPage', payload: queryParam });
  };

  // 查询表单
  queryForm() {
    const {
      dispatch,
      form: { getFieldDecorator },
      demo: { queryFlag, queryParam },
    } = this.props;
    if (queryFlag === false) {
      return <a onClick={() => dispatch({ type: 'demo/save', payload: { queryFlag: true } })}>显示查询表单</a>;
    }
    return (
      <Fragment>
        <a onClick={() => dispatch({ type: 'demo/save', payload: { queryFlag: false } })}>隐藏查询表单</a>
        <Form onSubmit={this.queryPage} layout="inline" className={styles.queryForm}>
          <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
            <Form.Item label="查询文字">{getFieldDecorator('text', { initialValue: queryParam.text })(<Input placeholder="提示信息" />)}</Form.Item>
            <Form.Item label="下拉选择">
              {getFieldDecorator('select', { initialValue: queryParam.select })(
                <Select placeholder="提示信息" allowClear={true}>
                  {StatusArray.map(item => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="级联选择">
              {getFieldDecorator('status', { initialValue: queryParam.status })(<Cascader placeholder="" allowClear={true} options={AddressOptions} />)}
            </Form.Item>
          </Row>
          <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
            <Form.Item label="时间范围">{getFieldDecorator('rangeTime', { initialValue: queryParam.text })(<DatePicker.RangePicker />)}</Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <span className={styles.spanWidth16} />
              <Button htmlType="reset">重置</Button>
            </Form.Item>
          </Row>
        </Form>
      </Fragment>
    );
  }

  render() {
    const { demo } = this.props;
    const columns = [
      { title: '数据列1', dataIndex: 'col1', width: 150, sorter: true },
      {
        title: '数据列2',
        dataIndex: 'col2',
        width: 150,
        sorter: true,
        filters: [{ text: '筛选1', value: '筛选1' }, { text: '筛选2', value: '筛选2' }],
      },
      {
        title: '数据列3',
        dataIndex: 'col3',
        width: 150,
        sorter: true,
        filters: [{ text: '筛选3', value: '筛选3' }, { text: '筛选4', value: '筛选4' }],
        filterMultiple: false,
      },
      {
        title: '数据列4',
        dataIndex: 'col4',
        width: 150,
        sorter: true,
        filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
          <div className={styles.customFilterDropdown}>
            <Input
              // ref={ele => this.searchInput = ele}
              placeholder="自定义筛选"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              // onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button type="primary" onClick={null}>
              确定
            </Button>
            <Button onClick={null}>重置</Button>
          </div>
        ),
      },
      { title: '数据列5', dataIndex: 'col5', width: 150, sorter: true },
      { title: '数据列6', dataIndex: 'col6', width: 150, sorter: true },
      { title: '数据列7', dataIndex: 'col7', width: 150, sorter: true },
      { title: '数据列8', dataIndex: 'col8', width: 150, sorter: true },
      { title: '数据列9', dataIndex: 'col9', width: 150, sorter: true },
      { title: '数据列10', dataIndex: 'col10', width: 150, sorter: true },
      { title: '数据列11', dataIndex: 'col11', width: 150, sorter: true },
      { title: '数据列12', dataIndex: 'col12', width: 150, sorter: true },
      { title: '数据列13', dataIndex: 'col13', width: 150, sorter: true },
      { title: '数据列14', dataIndex: 'col14', width: 150, sorter: true },
      { title: '数据列15', dataIndex: 'col15', width: 150, sorter: true },
      {
        title: '操作',
        align: 'center',
        key: 'action',
        width: 60,
        fixed: 'right',
        render: (val, record) => (
          <Fragment>
            <a onClick={() => console.log('编辑数据 ', record)}>编辑</a>
          </Fragment>
        ),
      },
    ];
    let { screenHeight } = this.state;
    screenHeight = document.documentElement.clientHeight;
    let scroll = { x: 1800, y: screenHeight - 585 + 39 + 68 };
    if (demo.queryFlag === false) {
      scroll.y += 84;
    }
    if (scroll.y < 50) {
      scroll = undefined;
    }
    return (
      <PageHeaderLayout>
        <Card bordered={false} className={styles.myCardBody}>
          <div className={styles.queryForm}>{this.queryForm()}</div>
          <Table
            size="middle"
            bordered={true}
            rowKey={record => record.col1}
            columns={columns}
            // loading={quetyLoading}
            dataSource={demo.data}
            pagination={demo.pagination}
            onChange={this.handleTableChange}
            title={() => (
              <div>
                表格页头
                <span className={styles.spanWidth16} />
                <Button.Group>
                  <Button icon="save">操作1</Button>
                  <Button icon="reload">操作2</Button>
                  <Button icon="download">操作3</Button>
                </Button.Group>
              </div>
            )}
            footer={() => <div>表格页脚</div>}
            scroll={scroll}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
