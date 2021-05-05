import { SELECT_RESOURCE, UNSELECT_RESOURCE } from '../constants/actionTypes';

const initState = [];

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SELECT_RESOURCE:
      return [...state, action.payload];
    case UNSELECT_RESOURCE:
      return state.filter((resource) => resource !== action.payload);
    default:
      return state;
  }
};

export default reducer;
