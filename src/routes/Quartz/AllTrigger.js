import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Select, Button, Table } from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
import { SorterOrderMapper } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './AllTrigger.less';

@connect(({ GlobalEnumModel, AllTriggerModel, loading }) => ({
  GlobalEnumModel,
  AllTriggerModel,
  queryLoading: loading.effects['AllTriggerModel/findByPage'],
}))
@Form.create()
export default class AllTrigger extends PureComponent {

  // 数据初始化
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'GlobalEnumModel/getJobGroupNames' });
    dispatch({ type: 'GlobalEnumModel/getTriggerGroupNames' });
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    dispatch({ type: 'AllTriggerModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, AllTriggerModel } = this.props;
    const queryParam = { ...AllTriggerModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'AllTriggerModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const { dispatch, form: { getFieldDecorator }, queryLoading, GlobalEnumModel: { triggerGroupList, jobGroupList }, AllTriggerModel: { queryParam, triggerKeyNameList, jobKeyNameList } } = this.props;
    return (
      <Form onSubmit={this.findByPage} layout="inline" className={styles.queryForm}>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="触发器组">
            {getFieldDecorator('triggerGroup', { initialValue: queryParam.triggerGroup })(
              <Select placeholder="触发器组" allowClear={true} onChange={triggerGroup => dispatch({ type: 'AllTriggerModel/getTriggerKeyByGroup', payload: { triggerGroup } })}>
                {triggerGroupList.map(name => (<Select.Option key={name} value={name}>{name}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="触发器名">
            {getFieldDecorator('triggerName', { initialValue: queryParam.triggerName })(
              <Select placeholder="触发器名" allowClear={true}>
                {triggerKeyNameList.map(item => (<Select.Option key={item.triggerName} value={item.triggerName}>{item.triggerName}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="任务组名">
            {getFieldDecorator('jobGroup', { initialValue: queryParam.jobGroup })(
              <Select placeholder="任务组名" allowClear={true} onChange={jobGroup => dispatch({ type: 'AllTriggerModel/getJobKeyByGroup', payload: { jobGroup } })}>
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
    const { AllTriggerModel, queryLoading } = this.props;
    const columns = [
      { title: '调度器名称', dataIndex: 'schedName' },
      { title: '', dataIndex: 'triggerGroup' },
      { title: '', dataIndex: 'triggerName' },
      { title: '任务组名', dataIndex: 'jobGroup' },
      { title: '任务名称', dataIndex: 'jobName' },
      // { title: '说明', dataIndex: 'description' },
      { title: '上次触发时间', dataIndex: 'prevFireTime' },
      { title: '下次触发时间', dataIndex: 'nextFireTime' },
      { title: '优先级', dataIndex: 'priority' },
      { title: '当前状态', dataIndex: 'triggerState' },
      { title: '类型', dataIndex: 'triggerType' },
      { title: '开始时间', dataIndex: 'startTime' },
      { title: '结束时间', dataIndex: 'endTime' },
      // { title: '', dataIndex: 'calendarName' },
      // { title: '', dataIndex: 'misfireInstr' },
      // { title: '', dataIndex: 'repeatCount' },
      // { title: '', dataIndex: 'repeatInterval' },
      // { title: '', dataIndex: 'timesTriggered' },
      { title: 'CRON表达式', dataIndex: 'cronExpression' },
      { title: '使用时区', dataIndex: 'timeZoneId' },
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
        rowKey={({ jobGroup, jobName }) => `id-${jobGroup}-${jobName}`}
        columns={columns}
        loading={queryLoading}
        dataSource={AllTriggerModel.data}
        pagination={AllTriggerModel.pagination}
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
