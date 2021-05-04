import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.scss';

import ResourcesView from './views/ResourcesVIew.jsx/ResourcesView';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ResourcesView} />
      </Switch>
    </Router>
  )
}

