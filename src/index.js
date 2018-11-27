import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import storeManager from './store/storeManager';

const routes = getRoutes();
const store = storeManager();

render(<Provider store={store}>{routes}</Provider>, document.getElementById('app'));
