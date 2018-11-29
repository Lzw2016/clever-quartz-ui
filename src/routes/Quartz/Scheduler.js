import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Button, Table } from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
import { ModelInitState } from '../../utils/constant';
// import { SorterOrderMapper } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './Scheduler.less';

@connect(({ SchedulerModel, loading }) => ({
  SchedulerModel,
  queryLoading: loading.effects['SchedulerModel/findByPage'],
}))
@Form.create()
export default class Scheduler extends PureComponent {

  // 数据初始化
  componentDidMount() {
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    dispatch({ type: 'SchedulerModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 查询表单
  queryForm() {
    const {
      // form: { getFieldDecorator },
      queryLoading,
      // SchedulerModel: { queryParam },
    } = this.props;
    return (
      <Form onSubmit={this.findByPage} layout="inline" className={styles.queryForm}>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item className={styles.formItemButton}>
            <Button type="primary" htmlType="submit" disabled={queryLoading}>查询</Button>
          </Form.Item>
        </Row>
      </Form>
    );
  }

  // 数据表格
  getTable() {
    const { SchedulerModel, queryLoading } = this.props;
    const columns = [
      { title: '调度器名称', dataIndex: 'schedName' },
      { title: '调度器实例', dataIndex: 'instanceName' },
      { title: '最后健康检查时间', dataIndex: 'lastCheckinTime' },
      { title: '健康检查间隔', dataIndex: 'checkinInterval' },
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
        rowKey={record => record.instanceName}
        columns={columns}
        loading={queryLoading}
        dataSource={SchedulerModel.data}
        pagination={ModelInitState.pagination}
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
