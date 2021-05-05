import { GET_RESOURCE_SUCCESSFUL, SHOW_LOADER } from '../constants/actionTypes';

const showLoader = (state = false, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return true;
    case GET_RESOURCE_SUCCESSFUL:
      return false;
    default:
      return state;
  }
};

export default showLoader;
