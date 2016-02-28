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

// import MyRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
// import ThemeManager from 'material-ui/lib/styles/theme-manager';
// import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';


var appPalette = {
primary1Color: "#1690DB",
primary2Color: "#2173B3",
primary3Color: "#A9D2EB",
accent1Color: "#ED3B3B",
accent2Color: "#ED2B2B",
accent3Color: "#F58C8C"
}

// ThemeManager.setTheme(ThemeManager.types.LIGHT);
// ThemeManager.setPalette(appPalette);

const routes = getRoutes();
const store = storeManager();

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('app')
);
