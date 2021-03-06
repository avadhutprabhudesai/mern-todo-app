import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './src/components/App';
import { Provider } from 'react-redux';
import store from './src/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
