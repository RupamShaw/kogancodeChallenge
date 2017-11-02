
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';
import React from 'react'

import store from './store.js'
import { Provider } from 'react-redux'
import RestContainer from './containers/RestContainer'

const App = () => (
  <div>
    <RestContainer />
  </div>
)

const rootEl = document.getElementById('root');
const render = () => {

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
  console.log('store changed', store.getState())

};
render();
store.subscribe(render);
registerServiceWorker();
