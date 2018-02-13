import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import './index.css';
import reducers from './reducers';

import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

const middleWareStore = applyMiddleware(promise)(createStore);

ReactDOM.render((
    <Provider store={ middleWareStore(reducers) }>
        <App title="Welcome to react-kit" />
    </Provider>
  ), document.getElementById('root'));
registerServiceWorker();
