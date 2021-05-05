import { combineReducers } from 'redux';
import filters from './filters';
import resources from './resources';
import selectedResources from './selectedResources';
import refreshing from './refreshing';

const rootReducer = combineReducers({
  filters,
  resources,
  selectedResources,
  refreshing,
});
export default rootReducer;
