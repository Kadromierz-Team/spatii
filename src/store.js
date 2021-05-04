import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const composeEnhancers = composeWithDevTools({
  realtime: true,
  port: 8000,
  secure: false,
});
const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
