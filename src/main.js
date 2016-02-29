import './assets/css/flexboxgrid.css';
import './assets/css/font-awesome.css';
import './assets/css/main.css';
import './assets/css/autosuggest.css';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getRoutes from './routes/routes.js';
import storeManager from './store/storeManager.js';

const routes = getRoutes();
const store = storeManager();

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('app')
);
