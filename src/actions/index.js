import { exec } from 'child_process';
import * as AT from '../constants/actionTypes';

export const getInitData = () => (dispatch, getState) => {
  dispatch(getContexts());
};

export const getContexts = () => (dispatch, getState) => {
  exec('kubectl config get-contexts -o name', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    const contexts = stdout.split('\n').filter((context) => !!context);
    dispatch({ type: AT.GET_CONTEXT_LIST_SUCCESSFUL, payload: contexts });
  });
};

export const changeContext = (context) => ({
  type: AT.CHANGE_CONTEXT,
  payload: context,
});
