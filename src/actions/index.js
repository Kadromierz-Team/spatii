import { exec } from 'child_process';
import * as AT from '../constants/actionTypes';
import KubectlService from '../services/KubectlService';
import StoreService from '../services/StoreService';
import { formatCompactDescription } from '../utils/format';

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

  dispatch(getResources());
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
  const compactDescription = formatCompactDescription(resourceObject);

  dispatch({
    type: AT.GET_RESOURCE_DESCRIPTION_SUCCESSFUL,
    payload: { resourceObject, compactDescription },
  });
};

export const getResourceTypes = () => async (dispatch, getState) => {
  const { selectedContext } = getState().filters;
  const resourceTypes = await kubectlService.getContextResources();

  dispatch({
    type: AT.GET_RESOURCE_TYPES_LIST_SUCCESSFUL,
    payload: resourceTypes,
  });
  dispatch(getResources());
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

export const getResources = (showLoader = true) => async (
  dispatch,
  getState
) => {
  const { selectedResourceTypes, selectedNamespaces } = getState().filters;

  if (selectedResourceTypes.length === 0 || selectedNamespaces.length === 0) {
    return;
  }

  if (showLoader) {
    dispatch({
      type: AT.SHOW_LOADER,
    });
  }

  const resources = await kubectlService.getNamespaceResources(
    selectedNamespaces,
    selectedResourceTypes
  );

  dispatch({
    type: AT.GET_RESOURCE_SUCCESSFUL,
    payload: resources,
  });
};

export const changeSearchText = (text) => ({
  type: AT.CHANGE_SEARCH_TEXT,
  payload: text,
});

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

  dispatch(getResources());
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

  dispatch(getResources());
};

export const setStore = (items) => {
  const keys = Object.keys(items);
  keys.forEach(key => {
    const value = items[key];
    StoreService.set(key, value);
  });
};

export const applyKubectlPathFromStore = () => {
  const savedPath = StoreService.get('kubectlPath', null);
  if (savedPath) kubectlService._changeKubectlPath(savedPath);
}

export const changeSelectedResources = (resources) => ({
  type: AT.CHANGE_SELECTED_RESOURCE,
  payload: resources,
});

export const changeRefreshInterval = (interval) => ({
  type: AT.CHANGE_REFRESH_INTERVAL,
  payload: interval,
});

export const toggleRefresh = (value) => ({
  type: AT.TOGGLE_REFRESH,
  payload: value,
});

export const deletePod = (name, namespace) => async (dispatch, getState) => {
  dispatch({
    type: AT.SHOW_LOADER,
  });
  await kubectlService.deletePod(name, namespace);
  await dispatch(getResources());
};
