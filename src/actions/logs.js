import LogsService from '../services/LogsService';

let logsService = null;

export const startLogs = ()=>(dispatch)=>{

  const pods  = [{name:'production-kadro-core-d745bff87-h9jbr',namespace:'production'}, {name:'production-kadro-core-d745bff87-mzmq5',namespace:'production'}]
  logsService = new LogsService(pods, dispatch);
  setTimeout(()=>{
    console.log('STOP!!!');
    logsService.stop();
  },3000)
}
