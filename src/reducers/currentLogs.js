import { CLEAR_LOGS, PAUSE_LOGS, PUSH_LOGS, RESET_LOGS, RESUME_LOGS } from '../constants/actionTypes';

const initState = {
  logs: [],
  paused: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case PUSH_LOGS:
      return {
        ...state,
       logs:[...state.logs, action.payload],
      };
    case CLEAR_LOGS:
      return {
        ...state,
        logs:[],
      };
    case PAUSE_LOGS:
      return {
        ...state,
        paused: true,
      };
    case RESUME_LOGS:
      return {
        ...state,
        paused: false,
      };
    case RESET_LOGS:
      return {
        ...initState
      };
    default:
      return state;
  }
};

export default reducer;
