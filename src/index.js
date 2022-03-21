import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import axios from 'axios';
import { composeWithDevTools } from "redux-devtools-extension";
axios.defaults.baseURL = process.env.REACT_APP_FRESHDESK_BASE_URL;
axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_FRESHDESK_API_KEY
const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
