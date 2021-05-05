import { combineReducers } from 'redux';
import filters from './filters';
import currentLogs from './currentLogs';

const rootReducer = combineReducers({
  currentLogs,
  filters,
});
export default rootReducer;
