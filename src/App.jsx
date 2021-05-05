import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.global.scss';
import store from './store';
import ResourcesView from './views/ResourcesView/ResourcesView.redux.js';
import LogsView from './views/LogsView/LogsView.redux';
import { getInitData } from './actions';

store.dispatch(getInitData());

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={LogsView} />
        </Switch>
      </Router>
    </Provider>
  );
}
