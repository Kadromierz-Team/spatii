import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.global.scss';
import store from './store';
import ResourcesView from './components/ResourcesView/ResourcesView';

setTimeout(() => {
  store.dispatch({ type: 'RESET_STATE' });
});

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={ResourcesView} />
        </Switch>
      </Router>
    </Provider>
  );
}
