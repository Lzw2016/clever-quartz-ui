import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
// import classNames from 'classnames';
// import styles from './TriggerLog.less';

@connect(({ TriggerLogModel, loading }) => ({
  TriggerLogModel,
  queryLoading: loading.effects['global/queryPage'],
}))
export default class TriggerLog extends PureComponent {

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          TriggerLog
        </Card>
      </PageHeaderLayout>
    );
  }
}
