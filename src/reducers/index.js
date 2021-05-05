import { combineReducers } from 'redux';
import filters from './filters';
import resources from './resources';
import selectedResources from './selectedResources';

const rootReducer = combineReducers({
  filters,
  resources,
  selectedResources,
});
export default rootReducer;
