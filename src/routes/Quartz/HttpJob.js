import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Select, Button, Table, Tag, Icon, Badge, Divider, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
// import moment from 'moment';
import { stringify } from 'qs';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
import { fmtDateTime } from '../../utils/fmt';
import { SorterOrderMapper, HttpMethodMapper, TriggerStateMapper } from '../../utils/enum';
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
    const { dispatch, history, form: { getFieldDecorator }, queryLoading, GlobalEnumModel: { jobGroupList }, HttpJobModel: { queryParam, jobKeyNameList } } = this.props;
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
            <span className={styles.spanWidth16} />
            <Button onClick={() => history.push({ pathname: 'http/add' })}>新增</Button>
          </Form.Item>
        </Row>
      </Form>
    );
  }

  // 获得触发器
  getTrigger = (triggersResList) => {
    if (!triggersResList) return undefined;
    let trigger;
    triggersResList.forEach(item => {
      if (item.triggerType === 'CRON') {
        if (!trigger || trigger.nextFireTime > item.nextFireTime) {
          trigger = item;
        }
      }
    });
    return trigger;
  }

  getHttpJobConfig = (jobData) => {
    if (!jobData || !jobData.HttpJobConfig) return undefined;
    return jobData.HttpJobConfig;
  }

  // 数据表格
  getTable() {
    const { dispatch, HttpJobModel, queryLoading } = this.props;
    const columns = [
      // { title: '调度器名称', dataIndex: 'schedName' },
      { title: '任务组名', dataIndex: 'jobGroup' },
      { title: '任务名称', dataIndex: 'jobName' },
      // { title: '任务类型', dataIndex: 'jobClassName' },
      // { title: '', dataIndex: 'requestsRecovery' },
      // { title: '', dataIndex: 'description' },
      // { title: '', dataIndex: 'isDurable' },
      // { title: '', dataIndex: 'isNonconcurrent' },
      // { title: '', dataIndex: 'isUpdateData' },
      {
        title: '请求地址', dataIndex: 'jobData', render: val => {
          const httpJobConfig = this.getHttpJobConfig(val);
          if (!httpJobConfig) return '-';
          let color = HttpMethodMapper[`${httpJobConfig.method}`];
          if (!color) color = HttpMethodMapper.error;
          return (
            <Fragment>
              <Tag color={color.background} style={{ cursor: 'auto' }}>{httpJobConfig.method}</Tag>
              <Tag color="blue" style={{ cursor: 'auto' }}>{httpJobConfig.url}</Tag>
            </Fragment>
          );
        },
      },
      {
        title: '任务状态', dataIndex: 'triggersResList', key: "triggerState", render: val => {
          const trigger = this.getTrigger(val);
          if (!trigger) return '-';
          let triggerState = TriggerStateMapper[`${trigger.triggerState}`];
          if (!triggerState) triggerState = TriggerStateMapper.ERROR;
          return <Badge status={triggerState.status} text={triggerState.label} />;
          // <span style={{ color: triggerState.color }}>{triggerState.label}</span>;
        },
      },
      {
        title: 'Cron表达式', dataIndex: 'triggersResList', render: val => {
          const trigger = this.getTrigger(val);
          if (!trigger) return '-';
          return (
            <Fragment>
              <span style={{ color: '#1890ff' }}>{trigger.cronExpression}</span>
              <Icon type="info-circle" theme="twoTone" style={{ marginLeft: 16, cursor: 'pointer' }} title="查看触发时间" />
            </Fragment>
          );
        },
      },
      {
        title: '时区', dataIndex: 'triggersResList', key: "timeZoneId", render: val => {
          const trigger = this.getTrigger(val);
          if (!trigger) return '-';
          return trigger.timeZoneId;
        },
      },
      {
        title: '上次执行时间', dataIndex: 'triggersResList', key: "prevFireTime", render: val => {
          const trigger = this.getTrigger(val);
          if (!trigger) return '-';
          return fmtDateTime(trigger.prevFireTime);
        },
      },
      {
        title: '下次执行时间', dataIndex: 'triggersResList', key: "nextFireTime", render: val => {
          const trigger = this.getTrigger(val);
          if (!trigger) return '-';
          return fmtDateTime(trigger.nextFireTime);
        },
      },
      {
        title: '开始时间', dataIndex: 'triggersResList', key: "startTime", render: val => {
          const trigger = this.getTrigger(val);
          if (!trigger) return '-';
          return fmtDateTime(trigger.startTime);
        },
      },
      {
        title: '结束时间', dataIndex: 'triggersResList', key: "endTime", render: val => {
          const trigger = this.getTrigger(val);
          if (!trigger || trigger.endTime <= 0) return '-';
          return fmtDateTime(trigger.endTime);
        },
      },
      {
        title: '操作', align: 'center', key: 'action',
        render: (_, { jobGroup, jobName }) => {
          const style = { marginRight: 8 };
          return (
            <Fragment>
              <Popconfirm
                placement="leftTop"
                title={`确认暂停任务[${jobGroup}-${jobName}]?`}
                okText="暂停"
                cancelText="取消"
                onConfirm={() => {
                  dispatch({
                    type: 'HttpJobModel/pauseJob',
                    payload: { jobGroup, jobName },
                    successCallBack: resultData => message.success(`暂停任务[${resultData.jobGroup}-${resultData.jobName}]成功`),
                  });
                }}
              >
                <a style={style}>暂停</a>
              </Popconfirm>
              <Popconfirm
                placement="leftTop"
                title={`确认继续任务[${jobGroup}-${jobName}]?`}
                okText="继续"
                cancelText="取消"
                onConfirm={() => {
                  dispatch({
                    type: 'HttpJobModel/resumeJob',
                    payload: { jobGroup, jobName },
                    successCallBack: resultData => message.success(`继续执行任务[${resultData.jobGroup}-${resultData.jobName}]成功`),
                  });
                }}
              >
                <a style={style}>继续</a>
              </Popconfirm>
              <Popconfirm
                placement="leftTop"
                title={`确认立即执行任务[${jobGroup}-${jobName}]?`}
                okText="立即执行"
                cancelText="取消"
                onConfirm={() => {
                  dispatch({
                    type: 'HttpJobModel/triggerJob',
                    payload: { jobGroup, jobName },
                    successCallBack: resultData => message.success(`立即执行任务[${resultData.jobGroup}-${resultData.jobName}]成功`),
                  });
                }}
              >
                <a>立即执行</a>
              </Popconfirm>
              <Divider type="vertical" />
              <Link style={style} to={{ pathname: 'http/edit', search: `?${stringify({ jobGroup, jobName })}` }}>编辑</Link>
              <Popconfirm
                placement="leftTop"
                title={`确认删除任务[${jobGroup}-${jobName}]?`}
                okText="删除"
                cancelText="取消"
                onConfirm={() => {
                  dispatch({
                    type: 'HttpJobModel/deleteJobDetail',
                    payload: { jobGroup, jobName },
                    successCallBack: resultData => message.success(`删除任务[${resultData.jobGroup}-${resultData.jobName}]成功`),
                  });
                }}
              >
                <a style={{ color: '#f5222d' }}>删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
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
