import React from 'react';
import {ipcRenderer} from 'electron';
import { PauseOutlined, ClearOutlined,CaretRightOutlined } from '@ant-design/icons';
import {bindClassFunctions} from '../../utils/micsUtils';
import {Button, Layout, PageHeader, Input} from 'antd';
import LogBox from '../../components/molecules/LogBox/LogBox';

class LogsView extends React.Component {
  constructor(props) {
    super(props);
    bindClassFunctions(this)
  }

  onSearch(searchValue){
    ipcRenderer.send('search-text', searchValue, true)
  }

  onBack(){
    this.props.resetLogs();
    this.props.history.push('/')
  }

  render() {
    const {currentLogs, pauseLogs, clearLogs, resumeLogs} = this.props;
    const {logs, paused} = currentLogs;
    return (
      <Layout>
        <PageHeader title={"Logs"} onBack={this.onBack} extra={[
          paused?<Button icon={<CaretRightOutlined />} type="primary" onClick={resumeLogs}>Resume</Button>:<Button icon={<PauseOutlined />} type="primary" onClick={pauseLogs}>Pause</Button>,
          <Button icon={<ClearOutlined />} type="primary" onClick={clearLogs}>Clear</Button>,
          <Input.Search onSearch={this.onSearch}  style={{width: '250px'}}/>]}
        />
        <LogBox logs={logs}/>
      <div className="logsView">
      </div>
      </Layout>
    );
  }

}


export default LogsView;
