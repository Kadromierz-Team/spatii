import { exec } from 'child_process';
import * as AT from '../constants/actionTypes';
import KubectlService from '../services/KubectlService';

const kubectlService = new KubectlService();

export const getInitData = () => async (dispatch, getState) => {
  dispatch(getContexts());
  await dispatch(getCurrentContext());
  dispatch(getNamespaces());
  dispatch(getResourceTypes());
};

export const getNamespaces = () => async (dispatch, getState) => {
  const { selectedContext } = getState().filters;
  const namespaces = await kubectlService.getNamespaces(selectedContext);

  dispatch({
    type: AT.GET_NAMESPACE_LIST_SUCCESSFUL,
    payload: namespaces,
  });
};

export const getResourceDescription = (resourceName) => async (
  dispatch,
  getState
) => {
  const { selectedNamespaces, selectedResourceTypes } = getState().filters;
  const resourceType = selectedResourceTypes[0];
  const namespace = selectedNamespaces[0];
  const resourceObject = await kubectlService.describeResource(
    resourceName,
    resourceType,
    namespace
  );

  dispatch({
    type: AT.GET_RESOURCE_DESCRIPTION_SUCCESSFUL,
    payload: resourceObject,
  });
};

export const getResourceTypes = () => async (dispatch, getState) => {
  const { selectedContext } = getState().filters;
  const resourceTypes = await kubectlService.getContextResources();

  dispatch({
    type: AT.GET_RESOURCE_TYPES_LIST_SUCCESSFUL,
    payload: resourceTypes,
  });
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

export const getCurrentContext = () => async (dispatch, getState) => {
  const context = await kubectlService.getCurrentContext();

  dispatch({
    type: AT.CHANGE_CONTEXT,
    payload: context,
  });
};

export const changeContext = (context) => async (dispatch, getState) => {
  await kubectlService.changeContext(context);
  await dispatch({
    type: AT.CHANGE_CONTEXT,
    payload: context,
  });
  dispatch(getNamespaces());
  dispatch(getResourceTypes());
};

export const clearResourceDescription = () => ({
  type: AT.CLEAR_RESOURCE_DESCRIPTION,
});

export const changeNamespaces = (namespaces) => ({
  type: AT.CHANGE_NAMESPACES,
  payload: namespaces,
});

export const changeResourceTypes = (namespaces) => ({
  type: AT.CHANGE_RESOURCE_TYPES,
  payload: namespaces,
});
