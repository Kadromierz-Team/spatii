import {
  CHANGE_REFRESH_INTERVAL,
  TOGGLE_REFRESH,
} from '../constants/actionTypes';

const initState = {
  isEnabled: false,
  refreshInterval: 5,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_REFRESH_INTERVAL:
      return {
        ...state,
        refreshInterval: action.payload,
      };
    case TOGGLE_REFRESH:
      return {
        ...state,
        isEnabled: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
