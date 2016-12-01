import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import ArticleForm from './Components/Submit';
import SignInForm from './Components/Login';
import firebase from 'firebase';
import SignUpForm from './Components/SignUp';
<<<<<<< HEAD
import ArticleList from './Components/Article';
=======
import ArticleControl from './Components/Article';
import Rating from './Components/Rating';
>>>>>>> rating
import {Route, Router, hashHistory, IndexRoute} from 'react-router';

import './css/index.css';

import 'bootstrap/dist/css/bootstrap.css';

var config = {
    apiKey: "AIzaSyBy8agFrVxo1uJkJFuqhLUYIaEpwCPry1A",
    authDomain: "firebaes-project.firebaseapp.com",
    databaseURL: "https://firebaes-project.firebaseio.com",
    storageBucket: "firebaes-project.appspot.com",
    messagingSenderId: "674443723360"
  };

firebase.initializeApp(config);
  
  
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/*<IndexRoute component={Home} />*/}
      <Route path="/login" component={SignInForm} />
      <Route path="/signup" component={SignUpForm} /> 
<<<<<<< HEAD
      <Route path='/article' component={ArticleList} />
      <Route path='/submit' component={ArticleForm} />
=======
      <Route path='/article' component={ArticleControl} />
      <Route path='/rating' component={Rating} />
>>>>>>> rating
      {/*<Route path="/search/:searchQuery" component={Search} />
      <Route path="/profile/:profileId" component={Profile} />
      <Route path="/article/:articleId" component={Article} />
      

      <Route path="/article/:articleId" component={Article} />*/}
    </Route>
    

  </Router>,
  document.getElementById('root')
);
