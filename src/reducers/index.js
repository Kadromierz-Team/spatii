import { combineReducers } from 'redux';
import filters from './filters';
import resources from './resources';
import currentLogs from './currentLogs';

const rootReducer = combineReducers({
  currentLogs,
  filters,
  resources,
});
export default rootReducer;
