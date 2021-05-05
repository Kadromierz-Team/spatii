import {exec, spawn} from 'child_process';
import * as AT from '../constants/actionTypes';
import LogsService from '../services/LogsService';



export const getInitData = () => (dispatch, getState)=>{
   dispatch(getContext());
   dispatch(startLogs())
};

export const startLogs = ()=>(dispatch)=>{
  const pods  = [{name:'production-kadro-core-d745bff87-h9jbr',namespace:'production'}, {name:'production-kadro-core-d745bff87-mzmq5',namespace:'production'}]
  const logsService = new LogsService(pods, dispatch);
  setTimeout(()=>{
    console.log('STOP!!!');
    logsService.stop();
  },3000)
}




export const getContext =()=> (dispatch, getState)=>{

  exec("kubectl config get-contexts -o name", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    const contexts = stdout.split('\n').filter(context=>!!context)
    dispatch({type: AT.GET_CONTEXT_LIST_SUCCESSFUL, payload: contexts});
  });

}
