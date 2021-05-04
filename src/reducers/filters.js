import {
  GET_CONTEXT_LIST_SUCCESSFUL,
  CHANGE_CONTEXT,
} from '../constants/actionTypes';

const initState = {
  contexts: [],
  selectedContext: null,
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
      console.log('CHANGE_CONTEXT', action);
      return {
        ...state,
        selectedContext: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
