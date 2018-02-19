import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import './index.css';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const middleWareStore = applyMiddleware(promise)(createStore);

ReactDOM.render(
  (
    <Provider store={middleWareStore(reducers)} />
  ), document.getElementById('root'),
);
registerServiceWorker();
