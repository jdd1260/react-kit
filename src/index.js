import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import './index.css';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const middleWareStore = applyMiddleware(promise)(createStore);

render(
  (
    <Provider store={middleWareStore(reducers)} >
      <div>React-kit</div>
    </Provider>
  ), document.getElementById('root'),
);
registerServiceWorker();
