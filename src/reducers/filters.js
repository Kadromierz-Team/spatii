import { GET_CONTEXT_LIST_SUCCESSFUL } from '../constants/actionTypes';

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
    default:
      return state;
  }
};

export default reducer;
