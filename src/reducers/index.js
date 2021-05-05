import { combineReducers } from 'redux';
import filters from './filters';
import resources from './resources';
import currentLogs from './currentLogs';
import selectedResources from './selectedResources';
import refreshing from './refreshing';
import showLoader from './loader';

const rootReducer = combineReducers({
  currentLogs,
  filters,
  resources,
  selectedResources,
  refreshing,
  showLoader,
});
export default rootReducer;
