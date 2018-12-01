import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
import { parse } from 'qs';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
// import classNames from 'classnames';
// import styles from './HttpJobEdit.less';

@connect(({ HttpJobEditModel, loading }) => ({
  HttpJobEditModel,
  queryLoading: loading.effects['global/queryPage'],
}))
export default class HttpJobEdit extends PureComponent {

  // 数据初始化
  componentDidMount() {
    const { location: { search } } = this.props;
    console.log(parse(search.substr(1, search.length)));
  }

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          HttpJobEdit
        </Card>
      </PageHeaderLayout>
    );
  }
}
