import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Select, Button, DatePicker, Input, Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
import { SorterOrderMapper } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './JobLog.less';

@connect(({ GlobalEnumModel, JobLogModel, loading }) => ({
  GlobalEnumModel,
  JobLogModel,
  queryLoading: loading.effects['JobLogModel/findByPage'],
}))
@Form.create()
export default class JobLog extends PureComponent {

  // 数据初始化
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'GlobalEnumModel/allScheduler' });
    dispatch({ type: 'GlobalEnumModel/getAllJobClassName' });
    dispatch({ type: 'GlobalEnumModel/getJobGroupNames' });
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    if (queryParam.startTimeByStart) {
      queryParam.startTimeByStart = moment(queryParam.startTimeByStart).format('YYYY-MM-DD HH:mm:ss');
    }
    if (queryParam.startTimeByEnd) {
      queryParam.startTimeByEnd = moment(queryParam.startTimeByEnd).format('YYYY-MM-DD HH:mm:ss');
    }
    dispatch({ type: 'JobLogModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, JobLogModel } = this.props;
    const queryParam = { ...JobLogModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'JobLogModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const {
      dispatch,
      form: { getFieldDecorator },
      queryLoading,
      GlobalEnumModel: { schedulerList, jobGroupList, jobClassNameList },
      JobLogModel: { queryParam, jobKeyNameList },
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
          <Form.Item label="任务组名">
            {getFieldDecorator('jobGroup', { initialValue: queryParam.jobGroup })(
              <Select placeholder="任务组名" allowClear={true} onChange={jobGroup => dispatch({ type: 'JobLogModel/getJobKeyByGroup', payload: { jobGroup } })}>
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
          <Form.Item label="任务类型">
            {getFieldDecorator('jobClassName', { initialValue: queryParam.jobClassName })(
              <Select placeholder="任务类型" allowClear={true}>
                {jobClassNameList.map(name => (<Select.Option key={name} value={name}>{name}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
        </Row>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="执行时间">
            {getFieldDecorator('startTimeByStart', { initialValue: queryParam.startTimeByStart ? moment(queryParam.startTimeByStart) : undefined })(
              <DatePicker placeholder="执行时间-开始" style={{ width: 174 }} />
            )}
          </Form.Item>
          <Form.Item label="执行结束">
            {getFieldDecorator('startTimeByEnd', { initialValue: queryParam.startTimeByEnd ? moment(queryParam.startTimeByEnd) : undefined })(
              <DatePicker placeholder="执行结束-结束" style={{ width: 174 }} />
            )}
          </Form.Item>
          <Form.Item label="执行耗时(ms)">
            {getFieldDecorator('processTimeByMin', { initialValue: queryParam.processTimeByMin })(
              <Input placeholder="执行耗时-最小值" />
            )}
          </Form.Item>
          <Form.Item label="执行耗时(ms)">
            {getFieldDecorator('processTimeByMax', { initialValue: queryParam.processTimeByMax })(
              <Input placeholder="执行耗时-最大值" />
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
    const { JobLogModel, queryLoading } = this.props;
    const columns = [
      // { title: '监听器名称', dataIndex: 'listenerName' },
      // { title: '调度器名称', dataIndex: 'schedName' },
      { title: '调度器实例', dataIndex: 'instanceName' },
      { title: '任务组', dataIndex: 'jobGroup' },
      { title: '任务名称', dataIndex: 'jobName' },
      // { title: '任务类型', dataIndex: 'jobClassName' },
      { title: '触发器组', dataIndex: 'triggerGroup' },
      { title: '触发器名', dataIndex: 'triggerName' },
      { title: '开始执行时间', dataIndex: 'startTime' },
      { title: '执行完成时间', dataIndex: 'endTime' },
      { title: '执行耗时', dataIndex: 'processTime' },
      { title: '上次运行', dataIndex: 'preRunTime' },
      { title: '下次运行', dataIndex: 'nextRunTime' },
      { title: '执行次数', dataIndex: 'runCount' },
      // { title: '执行IP地址', dataIndex: 'ipAddress' },
      { title: '状态', dataIndex: 'status' },
      // { title: '异常信息', dataIndex: 'exceptionInfo' },
      // { title: '', dataIndex: 'isVeto' },
      // { title: '执行前数据', dataIndex: 'beforeJobData' },
      // { title: '执行后数据', dataIndex: 'afterJobData' },
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
        dataSource={JobLogModel.data}
        pagination={JobLogModel.pagination}
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
