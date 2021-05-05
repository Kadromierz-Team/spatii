import { PUSH_LOGS } from '../constants/actionTypes';

const initState = {
  logs: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case PUSH_LOGS:
      return {
        ...state,
       logs:[...state.logs, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
