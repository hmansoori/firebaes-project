import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import {Col, Image, Form, FormControl, InputGroup, Button, Glyphicon} from 'react-bootstrap';
import firebase from 'firebase';
import {hashHistory, Link} from 'react-router';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { userId: null, show: false };
  }
  
  componentDidMount() {
    /* Add a listener and callback for authentication events */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Auth state changed: logged in as', user.email);
        this.setState({ userId: user.uid, show: true });
      }
      else {
        console.log('Auth state changed: logged out');
        this.setState({ userId: null, show: false }); //null out the saved state
        //hashHistory.push('/login');
      }
    })
  }

  //A callback function for logging out the current user
  signOut() {
    /* Sign out the user, and update the state */
    firebase.auth().signOut();
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>News Reviews</h1>
          {!this.state.userId &&
            <div className="login">
              <button className="btn btn-primary"><Link to='login'>Login</Link></button>
            </div>  
          }
          {this.state.userId &&  /*inline conditional rendering*/
            <div className="logout">
              <button className="btn btn-warning" onClick={() => this.signOut() }>Sign out {firebase.auth().currentUser.displayName}</button>
            </div>
          }
         </div>
        {this.props.children}
      </div>
    );
  }
}



export default App;
