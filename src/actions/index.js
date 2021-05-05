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

export const getResources = () => async (dispatch, getState) => {
  const service = new KubectlService();
  const { selectedResourceTypes, selectedNamespaces } = getState().filters;

  console.log({
    selectedResourceTypes,
    selectedNamespaces,
  });

  const resources = await service.getNamespaceResources(
    selectedNamespaces[0],
    selectedResourceTypes[0]
  );

  console.log({ resources });

  dispatch({
    type: AT.GET_RESOURCE_SUCCESSFUL,
    payload: resources,
  });
};

export const changeContext = (context) => async (dispatch, getState) => {
  await kubectlService.changeContext(context);
  await dispatch({
    type: AT.CHANGE_CONTEXT,
    payload: context,
  });
  await dispatch(changeNamespaces([]));
  await dispatch(changeResourceTypes([]));
  await dispatch(getNamespaces());
  await dispatch(getResourceTypes());
};

export const clearResourceDescription = () => ({
  type: AT.CLEAR_RESOURCE_DESCRIPTION,
});

export const changeNamespaces = (namespaces) => async (dispatch, getState) => {
  await dispatch({
    type: AT.CHANGE_NAMESPACES,
    payload: namespaces,
  });
  const resourceTypes = getState().filters.selectedResourceTypes;

  if (namespaces.length > 0 && resourceTypes.length > 0) {
    dispatch(getResources());
  }
};

export const changeResourceTypes = (resourceTypes) => async (
  dispatch,
  getState
) => {
  await dispatch({
    type: AT.CHANGE_RESOURCE_TYPES,
    payload: resourceTypes,
  });

  const namespaces = getState().filters.selectedNamespaces;

  if (resourceTypes.length > 0 && namespaces.length > 0) {
    dispatch(getResources());
  }
};
