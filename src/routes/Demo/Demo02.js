import React, { PureComponent } from 'react';
import { Card } from 'antd';
// import LzEditor from 'react-lz-editor';
// import 'antd/dist/antd.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Demo02.less';
// import classNames from 'classnames';

export default class Demo02 extends PureComponent {
  state = {
    htmlContent: '',
  };

  componentDidMount() {}

  receiveHtml = content => {
    console.log('recieved HTML content', content);
  };

  receiveMarkdown = content => {
    console.log('recieved markdown content', content);
  };

  render() {
    const { htmlContent } = this.state;
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: '<p>Hello World!</p>',
      // onChange: this.handleChange,
      // onRawChange: this.handleRawChange,
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.editorWrap}>
            <BraftEditor {...editorProps} />
          </div>
          <div style={{ height: 24 }} />
          {/* <LzEditor key='001' active={true} importContent={htmlContent} cbReceiver={this.receiveHtml} uploadProps={undefined} /> */}
        </Card>
      </PageHeaderLayout>
    );
  }
}
