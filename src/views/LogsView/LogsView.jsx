import React from 'react';
import {ipcRenderer} from 'electron';
import { PauseOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import {Button, Layout, PageHeader, Input} from 'antd';
import LogBox from '../../components/molecules/LogBox/LogBox';

class LogsView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this)


  }
  componentDidUpdate () {
    console.log('bum');
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    console.log(':D',this.messagesEndRef.scrollIntoView());
    // if(this.messagesEndRef) this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const {currentLogs} = this.props;
    return (
      <Layout>
        <PageHeader title={"Logi"}
                    extra={[<Button type="primary" onClick={()=>{
                      const requestId = webContents.findInPage('request')
                      console.log(requestId)
                    }}>Stop</Button>,<Button icon={<PauseOutlined />} type="primary">Pause</Button>, <Button type="primary">Scroll sync</Button>, <Input.Search onSearch={value=>{

                      ipcRenderer.send('search-text', value, true)
                    }}  style={{width: '250px'}}/>]}
        />
      <div className="logsView">
      <div className="logsBox">
        {currentLogs.logs.map((log,i)=>
          <>
            <span className="logsSourceLabel">{log.item}</span>
          <p key={i}>{log.value}</p>
          </>)}
        <div key={'lastEl'} ref={ref=>this.messagesEndRef=ref} />
      </div>
      </div>
      </Layout>
    );
  }

}







export default LogsView;
