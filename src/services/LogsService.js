import { spawn } from "child_process";
import moment from "moment";
import {bindClassFunctions} from '../utils/micsUtils';
import StoreService from '../services/StoreService';
import * as AT from '../constants/actionTypes';

class LogsService{
  constructor(pods, dispatch) {
    const kubectlPath = StoreService.get('kubectlPath', null)
    this.kubectlPath = kubectlPath || 'kubectl';
    this.pods = pods;
    this.dispatch = dispatch;
    this.process = {};
    this.state = `init`;
    this.pausedAt = null;

    bindClassFunctions(this);

    this.start();
  }

  start(from){
    const fromDate = from || moment().startOf('day').toISOString();
    this.pods.forEach(podConfig =>{
      const {name, namespace} = podConfig;
      this.startListener(name, namespace,fromDate);
    })
    this.state = 'running';
  }

  stop(){
    Object.keys(this.process).forEach(key=>{
      this.process[key].kill();
      delete this.process[key];
    })
  }

  pause(){
    if(this.state === 'running'){
      this.state = 'paused';
      this.pausedAt = moment().toISOString();
      this.stop();
    }
  }

  resume(){
    if(this.state === 'paused') {
      this.state = 'running';
      this.start(this.pausedAt);
      this.pausedAt = null;
    }
  }

  onNewLog(podName, value, type='logs'){
    this.dispatch({type:AT.PUSH_LOGS, payload:{item:podName, value, type}})
  }


  getPodSlug(podName, namespace){
    return `${namespace}-${podName}`;
  }

  killProcess(slug){
    if(this.process[slug]){
      this.process[slug].kill();
      delete this.process[slug];
    }
  }

  startListener(podName, namespace, from){

    const podSlug = this.getPodSlug(podName, namespace);
    const command = spawn(this.kubectlPath,['-n',namespace,'logs',`pod/${podName}`,'-f',`--since-time=${from}`]);

    command.stdout.on('data', (data) => {
      this.onNewLog(podSlug, data.toString());
    });

    command.stderr.on('data', (data) => {
      this.onNewLog(podSlug, data.toString(), 'error');
      this.killProcess(podSlug);
    });

    command.on('close', (code) => {
      this.onNewLog(podSlug, 'Process stopped', 'info');
      if(this.process[podSlug]) delete this.process[podSlug];
    });

    this.process[podSlug] = command;
  }

}

export default LogsService;
