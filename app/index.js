import React from 'react';
// import Router, { IndexRedirect, IndexRoute, Route } from 'react-router';
import Router, { Route } from 'react-router';
import './index.html';
import { getHistory } from './services/HistoryService';
import InterceptorService from './services/InterceptorService';
import TappRoot from './components/TappRoot';

InterceptorService.init();

const routes = (
  <Router history={getHistory()}>
    <Route path="/" component={TappRoot}>
    </Route>
  </Router>
);

React.render(routes, document.getElementById('react-mount'));
