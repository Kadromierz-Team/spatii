import { combineReducers } from 'redux';
import filters from './filters';
import resources from './resources';
import currentLogs from './currentLogs';
import selectedResources from './selectedResources'

const rootReducer = combineReducers({
  currentLogs,
  filters,
  resources,
  selectedResources
});
export default rootReducer;
