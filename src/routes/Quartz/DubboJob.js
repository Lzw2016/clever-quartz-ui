import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
// import classNames from 'classnames';
// import styles from './DubboJob.less';

@connect(({ DubboJobModel, loading }) => ({
  DubboJobModel,
  queryLoading: loading.effects['global/queryPage'],
}))
export default class DubboJob extends PureComponent {

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          DubboJob
        </Card>
      </PageHeaderLayout>
    );
  }
}
