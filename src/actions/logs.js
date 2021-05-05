import LogsService from '../services/LogsService';
import * as AT from '../constants/actionTypes';

let logsService = null;

export const startLogs = ()=>(dispatch, getState)=>{
  const {selectedResources, filters} = getState();
  const namespace = filters.selectedNamespaces[0];
  const pods = selectedResources.map(podName=>({name: podName, namespace}));
  logsService = new LogsService(pods, dispatch);
}

export const pauseLogs = ()=>(dispatch)=>{
  if(logsService){
    logsService.pause();
    dispatch({type:AT.PAUSE_LOGS});
  }
}

export const resumeLogs = ()=>(dispatch)=>{
  if(logsService){
    logsService.resume();
    dispatch({type:AT.RESUME_LOGS});
  }
}

export const clearLogs = ()=>({
  type: AT.CLEAR_LOGS
})

export const resetLogs = ()=>(dispatch)=>{
  if(logsService){
    logsService.pause();
    dispatch({type:AT.RESET_LOGS});
    logsService = null;
  }
}