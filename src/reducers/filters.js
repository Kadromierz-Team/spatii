import {
  GET_CONTEXT_LIST_SUCCESSFUL,
  CHANGE_CONTEXT,
  GET_NAMESPACE_LIST_SUCCESSFUL,
  CHANGE_NAMESPACES,
  GET_RESOURCE_TYPES_LIST_SUCCESSFUL,
  CHANGE_RESOURCE_TYPES,
} from '../constants/actionTypes';

const initState = {
  contexts: [],
  selectedContext: null,
  namespaces: [],
  selectedNamespaces: [],
  resourceTypes: [],
  selectedResourceTypes: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CONTEXT_LIST_SUCCESSFUL:
      return {
        ...state,
        contexts: action.payload,
        selectedContext: action.payload[0] || null,
      };
    case CHANGE_CONTEXT:
      return {
        ...state,
        selectedContext: action.payload,
      };
    case GET_NAMESPACE_LIST_SUCCESSFUL:
      return {
        ...state,
        namespaces: action.payload,
      };
    case CHANGE_NAMESPACES:
      return {
        ...state,
        selectedNamespaces: action.payload,
      };
    case GET_RESOURCE_TYPES_LIST_SUCCESSFUL:
      return {
        ...state,
        resourceTypes: action.payload,
      };
    case CHANGE_RESOURCE_TYPES:
      return {
        ...state,
        selectedResourceTypes: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
