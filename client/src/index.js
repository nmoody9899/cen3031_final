import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'; //style the Header for right now because it's a mess

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';//because file named index.js don't need to import named

//redux will be used to track user authentication across site
//create store - store needs a reducer to update state
//call with composeWithDevTools()
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  //<React.StrictMode> commented out to remove following warnings
  /*
  Warning: findDOMNode is deprecated in StrictMode. findDOMNode 
  was passed an instance of SubPopupMenu which is inside StrictMode.
  Instead, add a ref directly to the element you want to reference.
  Learn more about using refs safely here:
  https://reactjs.org/link/strict-mode-find-node
  */
  //wrap below in Provider from Redux and pass the store to the provider
  //if you don't pass the store this blows up! 
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
