import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';


import firebase from 'firebase/app'
require('firebase/auth')
require('firebase/database')
require('firebase/storage')

const firebaseConfig = {
  apiKey: "AIzaSyBFj4sZWvQV1Cz190Xay_1FtWtT7NshYnE",
  authDomain: "the-vegan-community-api.firebaseapp.com",
  databaseURL: "https://the-vegan-community-api-default-rtdb.firebaseio.com",
  projectId: "the-vegan-community-api",
  storageBucket: "the-vegan-community-api.appspot.com",
  messagingSenderId: "592696552624",
  appId: "1:592696552624:web:d5a12ab0144391b6295f75",
  measurementId: "G-F212EMJZTP"
}
firebase.initializeApp(firebaseConfig)

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#629749',
      main: '#33691e',
      dark: '#003d00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffb04c',
      main: '#f57f17',
      dark: '#bc5100',
      contrastText: '#000',
    }
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App firebase={firebase} />
      </ ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
