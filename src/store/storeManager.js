import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import middleware from '../middleware/middleware.js';
import thunkMiddleWare from 'redux-thunk';
import initialState from './initialState.js';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleWare,
    middleware
)(createStore);

export default function initStore() {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}

