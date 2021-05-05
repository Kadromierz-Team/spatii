import {
  GET_CONTEXT_LIST_SUCCESSFUL,
  CHANGE_CONTEXT,
  GET_NAMESPACE_LIST_SUCCESSFUL,
  CHANGE_NAMESPACES,
  GET_RESOURCE_TYPES_LIST_SUCCESSFUL,
  CHANGE_RESOURCE_TYPES,
  GET_RESOURCE_DESCRIPTION_SUCCESSFUL,
  CLEAR_RESOURCE_DESCRIPTION,
  CHANGE_SEARCH_TEXT,
} from '../constants/actionTypes';

const initState = {
  contexts: [],
  selectedContext: null,
  namespaces: [],
  selectedNamespaces: [],
  resourceTypes: [],
  selectedResourceTypes: [],
  resourceDescription: null,
  searchText: '',
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
    case GET_RESOURCE_DESCRIPTION_SUCCESSFUL:
      return {
        ...state,
        resourceDescription: action.payload,
      };
    case CLEAR_RESOURCE_DESCRIPTION:
      return {
        ...state,
        resourceDescription: null,
      };
    case CHANGE_RESOURCE_TYPES:
      return {
        ...state,
        selectedResourceTypes: action.payload,
      };
    case CHANGE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
