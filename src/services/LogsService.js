import { spawn } from "child_process";
import {bindClassFunctions} from '../utils/micsUtils';
import * as AT from '../constants/actionTypes';

class LogsService{
  constructor(pods, dispatch) {
  this.dispatch = dispatch;
  this.process = {};

  bindClassFunctions(this);

  this.init(pods);
  }

  init(pods){
    pods.forEach(podConfig =>{
      const {name, namespace} = podConfig;
      this.startListener(name, namespace);
    })
  }

  stop(){
    Object.keys(this.process).forEach(key=>{
      this.process[key].kill();
      delete this.process[key];
    })
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

  startListener(podName, namespace){
    const podSlug = this.getPodSlug(podName, namespace);
    const command = spawn('kubectl',['-n',namespace,'logs',`pod/${podName}`,'-f']);

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
