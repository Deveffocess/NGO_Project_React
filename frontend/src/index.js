import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './component/admin/Store'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

ReactDOM.render(
 
    <BrowserRouter>
    <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <App />
    </MuiPickersUtilsProvider>
    </Provider>
    </BrowserRouter>,
 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

