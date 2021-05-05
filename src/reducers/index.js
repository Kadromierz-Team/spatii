import { combineReducers } from 'redux';
import filters from './filters';
import resources from './resources';
import currentLogs from './currentLogs';
import selectedResources from './selectedResources'
import refreshing from './refreshing';

const rootReducer = combineReducers({
  currentLogs,
  filters,
  resources,
  selectedResources,
  refreshing,
});
export default rootReducer;
