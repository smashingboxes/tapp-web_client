import React from 'react';
import Router, { Route } from 'react-router';
import './index.html';
import { getHistory } from './services/HistoryService';
import TappRoot from './components/TappRoot';
import SensorHistory from './components/SensorHistory';

const routes = (
  <Router history={getHistory()}>
    <Route path="/" component={TappRoot}>
      <Route path="history" component={SensorHistory} />
    </Route>
  </Router>
);

React.render(routes, document.getElementById('react-mount'));
