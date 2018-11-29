import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Select, Button, Table } from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
import { SorterOrderMapper } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './HttpJob.less';

@connect(({ GlobalEnumModel, HttpJobModel, loading }) => ({
  GlobalEnumModel,
  HttpJobModel,
  queryLoading: loading.effects['HttpJobModel/findByPage'],
}))
@Form.create()
export default class HttpJob extends PureComponent {

  // 数据初始化
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'GlobalEnumModel/getJobGroupNames' });
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    dispatch({ type: 'HttpJobModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, HttpJobModel } = this.props;
    const queryParam = { ...HttpJobModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'HttpJobModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const { dispatch, form: { getFieldDecorator }, queryLoading, GlobalEnumModel: { jobGroupList }, HttpJobModel: { queryParam, jobKeyNameList } } = this.props;
    return (
      <Form onSubmit={this.findByPage} layout="inline" className={styles.queryForm}>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="任务组名">
            {getFieldDecorator('jobGroup', { initialValue: queryParam.jobGroup })(
              <Select placeholder="任务组名" allowClear={true} onChange={jobGroup => dispatch({ type: 'HttpJobModel/getJobKeyByGroup', payload: { jobGroup } })}>
                {jobGroupList.map(name => (<Select.Option key={name} value={name}>{name}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="任务名称">
            {getFieldDecorator('jobName', { initialValue: queryParam.jobName })(
              <Select placeholder="任务名称" allowClear={true}>
                {jobKeyNameList.map(item => (<Select.Option key={item.jobName} value={item.jobName}>{item.jobName}</Select.Option>))}
              </Select>
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
    const { HttpJobModel, queryLoading } = this.props;
    const columns = [
      { title: '调度器名称', dataIndex: 'schedName' },
      { title: '任务组名', dataIndex: 'jobGroup' },
      { title: '任务名称', dataIndex: 'jobName' },
      { title: '任务类型', dataIndex: 'jobClassName' },
      // { title: '', dataIndex: 'requestsRecovery' },
      // { title: '', dataIndex: 'description' },
      // { title: '', dataIndex: 'isDurable' },
      // { title: '', dataIndex: 'isNonconcurrent' },
      // { title: '', dataIndex: 'isUpdateData' },
      {
        title: 'Cron表达式', dataIndex: 'triggersResList', render: val => {
          if (!val || val.length <= 0) return '-';
          return val[0].cronExpression;
        },
      },
      // { title: '上次执行时间', dataIndex: 'prevFireTime' },
      // { title: '下次执行时间', dataIndex: 'nextFireTime' },
      {
        title: '操作', align: 'center', key: 'action',
        render: () => (
          <Fragment>
            <a>删除</a>
          </Fragment>
        ),
      },
    ];
    return (
      <Table
        size="middle"
        bordered={true}
        rowKey={({ jobGroup, jobName }) => `id-${jobGroup}-${jobName}`}
        columns={columns}
        loading={queryLoading}
        dataSource={HttpJobModel.data}
        pagination={HttpJobModel.pagination}
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
