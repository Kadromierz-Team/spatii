import { combineReducers } from 'redux';
import filters from './filters';
import resources from './resources';

const rootReducer = combineReducers({
  filters,
  resources,
});
export default rootReducer;
