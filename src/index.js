import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import ArticleForm from './Components/Submit';
import SignInForm from './Components/Login';
import SignUpForm from './Components/SignUp';
import ArticleList from './Components/Article';
import {Article} from './Components/Article';
import Rating from './Components/Rating';
import ProfileControl from './Components/Profile';

import firebase from 'firebase';
import {Route, Router, hashHistory, IndexRoute} from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import './css/App.css';




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
      <IndexRoute component={ArticleList} />
      <Route path="/login" component={SignInForm} />
      <Route path="/signup" component={SignUpForm} /> 
      <Route path="/article/:articleId" component={Article} />
      <Route path='/article' component={ArticleList} ></Route>
      <Route path='/submit' component={ArticleForm} />
      <Route path='/rating' component={Rating} />
      <Route path="/user/:userId" component={ProfileControl} />

      {/*<Route path="/search/:searchQuery" component={Search} />
      
      <Route path="/article/:articleId" component={Article} />
      
      <Route path="/article/:articleId" component={Article} />*/}
    </Route>
    

  </Router>,
  document.getElementById('root')
);