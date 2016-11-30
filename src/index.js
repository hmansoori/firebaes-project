import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import SignUpForm from './Components/SignUp';

import firebase from 'firebase';
import {Route, Router, hashHistory, IndexRoute} from 'react-router';
import './index.css';

var config = {
    apiKey: "AIzaSyBy8agFrVxo1uJkJFuqhLUYIaEpwCPry1A",
    authDomain: "firebaes-project.firebaseapp.com",
    databaseURL: "https://firebaes-project.firebaseio.com",
    storageBucket: "firebaes-project.appspot.com",
    messagingSenderId: "674443723360"
  };
  firebase.initializeApp(config);
  
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}/>
      <Route path='join' component={SignUpForm}>
    </Route>
  </Router>
),document.getElementById('root')
);
