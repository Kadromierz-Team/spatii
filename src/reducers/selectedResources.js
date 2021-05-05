import { CHANGE_SELECTED_RESOURCE } from '../constants/actionTypes';

const initState = [];

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_RESOURCE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
