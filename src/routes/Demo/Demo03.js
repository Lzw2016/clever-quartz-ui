import React, { PureComponent } from 'react';
import { Card, Button, DatePicker, TimePicker, Input, Select, InputNumber, Upload, message, Icon, Modal } from 'antd';
import Hotkeys from 'react-hot-keys';
// import BraftEditor from 'braft-editor';
// import 'braft-editor/dist/braft.css';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import classNames from 'classnames';
import styles from './Demo03.less';

export default class Demo03 extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    hotkeysTest: '按下键盘 shift+a 或 alt+s 或 ctrl+s',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  onKeyUp = (keyName, e, handle) => {
    e.preventDefault();
    console.log('test:onKeyUp', e, handle);
    this.setState({ hotkeysTest: `onKeyUp ${keyName}` });
  };

  onKeyDown = (keyName, e, handle) => {
    e.preventDefault();
    console.log('test:onKeyDown', keyName, e, handle);
    this.setState({ hotkeysTest: `onKeyDown ${keyName}` });
  };

  render() {
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const { previewVisible, previewImage, fileList, hotkeysTest } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    // const editorProps = {
    //   height: 300,
    //   contentFormat: 'html',
    //   initialContent: '<p>Hello World!</p>',
    //   // onChange: this.handleChange,
    //   // onRawChange: this.handleRawChange,
    // }
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div>
            <Button type="primary">Primary</Button>
            <span className={styles.spanWidth16} />
            <Button>Default</Button>
            <span className={styles.spanWidth16} />
            <Button type="dashed">Dashed</Button>
            <span className={styles.spanWidth16} />
            <Button type="danger">Danger</Button>
            <span className={styles.spanWidth16} />
            <Button type="primary" loading={true}>
              loading
            </Button>
          </div>
          <div style={{ height: 24 }} />
          <hr />
          <div>
            <DatePicker />
            <span className={styles.spanWidth16} />
            <DatePicker.MonthPicker placeholder="Select month" />
            <span className={styles.spanWidth16} />
            <DatePicker.RangePicker />
            <span className={styles.spanWidth16} />
            <DatePicker.WeekPicker placeholder="Select week" />
            <span className={styles.spanWidth16} />
            <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
          </div>
          <div style={{ height: 24 }} />
          <hr />
          <div>
            <Input placeholder="Basic usage" style={{ width: 150 }} />
            <span className={styles.spanWidth16} />
            <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" style={{ width: 230 }} />
            <span className={styles.spanWidth16} />
            <InputNumber min={1} max={10} defaultValue={3} />
            <span className={styles.spanWidth16} />
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="disabled" disabled>
                Disabled
              </Select.Option>
              <Select.Option value="Yiminghe">yiminghe</Select.Option>
            </Select>
          </div>
          <div style={{ height: 24 }} />
          <hr />
          <div style={{ width: 360 }}>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 文件上传
              </Button>
            </Upload>
          </div>
          <div style={{ height: 24 }} />
          <hr />
          <div className="clearfix">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 10 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          {/* <div style={{ height: 24 }} />
          <hr />
          <div className={styles.editorWrap}>
            <BraftEditor {...editorProps} />
          </div> */}
          <div style={{ height: 24 }} />
          <hr />
          <Hotkeys keyName="shift+a,alt+s,ctrl+s" onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
            <div style={{ padding: 10 }}>{hotkeysTest}</div>
          </Hotkeys>
        </Card>
      </PageHeaderLayout>
    );
  }
}
