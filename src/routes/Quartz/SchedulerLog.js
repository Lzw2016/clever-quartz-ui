import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Select, DatePicker, Table, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
import { SorterOrderMapper } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './SchedulerLog.less';

@connect(({ GlobalEnumModel, SchedulerLogModel, loading }) => ({
  GlobalEnumModel,
  SchedulerLogModel,
  queryLoading: loading.effects['SchedulerLogModel/findByPage'],
}))
@Form.create()
export default class SchedulerLog extends PureComponent {

  // 数据初始化
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'GlobalEnumModel/allScheduler' });
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    if (queryParam.logTimeStart) {
      queryParam.logTimeStart = moment(queryParam.logTimeStart).format('YYYY-MM-DD HH:mm:ss');
    }
    if (queryParam.logTimeEnd) {
      queryParam.logTimeEnd = moment(queryParam.logTimeEnd).format('YYYY-MM-DD HH:mm:ss');
    }
    dispatch({ type: 'SchedulerLogModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, SchedulerLogModel } = this.props;
    const queryParam = { ...SchedulerLogModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'SchedulerLogModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const {
      form: { getFieldDecorator },
      queryLoading,
      GlobalEnumModel: { schedulerList },
      SchedulerLogModel: { queryParam },
    } = this.props;
    return (
      <Form onSubmit={this.findByPage} layout="inline" className={styles.queryForm}>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="调度器实例">
            {getFieldDecorator('instanceName', { initialValue: queryParam.instanceName })(
              <Select placeholder="调度器实例" allowClear={true}>
                {schedulerList.map(item => (<Select.Option key={item.schedName} value={item.instanceName}>{item.instanceName}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="调度器事件">
            {getFieldDecorator('methodName', { initialValue: queryParam.methodName })(
              <Select placeholder="调度器事件" allowClear={true}>
                {[].map(name => (<Select.Option key={name} value={name}>{name}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="事件时间">
            {getFieldDecorator('logTimeStart', { initialValue: queryParam.logTimeStart ? moment(queryParam.logTimeStart) : undefined })(
              <DatePicker placeholder="事件时间-开始" style={{ width: 174 }} />
            )}
          </Form.Item>
          <Form.Item label="事件时间">
            {getFieldDecorator('logTimeEnd', { initialValue: queryParam.logTimeEnd ? moment(queryParam.logTimeEnd) : undefined })(
              <DatePicker placeholder="事件时间-结束" style={{ width: 174 }} />
            )}
          </Form.Item>
          <Form.Item className={styles.formItemButton}>
            <Button type="primary" htmlType="submit" disabled={queryLoading}>查询</Button>
          </Form.Item>
        </Row>
      </Form>
    );
  }

  // 数据表格
  getTable() {
    const { SchedulerLogModel, queryLoading } = this.props;
    const columns = [
      // { title: '监听器名称', dataIndex: 'listenerName' },
      { title: '调度器名称', dataIndex: 'schedName' },
      { title: '调度器实例', dataIndex: 'instanceName' },
      { title: '事件', dataIndex: 'methodName' },
      // { title: '', dataIndex: 'logData' },
      // { title: 'IP地址', dataIndex: 'ipAddress' },
      { title: '事件时间', dataIndex: 'logTime' },
      {
        title: '操作', align: 'center', key: 'action',
        render: () => (
          <Fragment>
            <a>详情</a>
          </Fragment>
        ),
      },
    ];
    return (
      <Table
        size="middle"
        bordered={true}
        rowKey={record => record.id}
        columns={columns}
        loading={queryLoading}
        dataSource={SchedulerLogModel.data}
        pagination={SchedulerLogModel.pagination}
        onChange={this.handleTableChange}
      />
    );
  }

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div>
            {this.queryForm()}
          </div>
          {/* {this.actionButton()} */}
          {this.getTable()}
        </Card>
      </PageHeaderLayout>
    );
  }
}
