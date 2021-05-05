import { GET_RESOURCE_SUCCESSFUL } from '../constants/actionTypes';

const initState = [];

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_RESOURCE_SUCCESSFUL:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
