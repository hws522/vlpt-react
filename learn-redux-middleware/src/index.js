import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
// import myLogger from './middlewares/myLogger';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
