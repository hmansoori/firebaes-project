import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

import firebase from 'firebase';
import './index.css';

var config = {
    apiKey: "AIzaSyBy8agFrVxo1uJkJFuqhLUYIaEpwCPry1A",
    authDomain: "firebaes-project.firebaseapp.com",
    databaseURL: "https://firebaes-project.firebaseio.com",
    storageBucket: "firebaes-project.appspot.com",
    messagingSenderId: "674443723360"
  };
  firebase.initializeApp(config);
  
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
