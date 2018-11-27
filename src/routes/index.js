import React from 'react';
import { Router } from '@reach/router';
import FinancesPage from '../containers/FinancesPage';
import Home from '../containers/Home';

import './global-styles';

export default () => (
  <Router>
    <Home path="/" />
    <FinancesPage path="legislator/:crpId" />
  </Router>
);
