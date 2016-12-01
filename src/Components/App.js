import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import {Col, Image, Form, FormControl, InputGroup, Button, Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';
import firebase from 'firebase';
import {hashHistory, Link} from 'react-router';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { userId: null };
  }
  
  componentDidMount() {
    /* Add a listener and callback for authentication events */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Auth state changed: logged in as', user.email);
        this.setState({ userId: user.uid });
      }
      else {
        console.log('Auth state changed: logged out');
        this.setState({ userId: null }); //null out the saved state

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

  handleClick(event) {
    console.log('click!');
  }
  
  render() {
    return (
      <Form inline className="search">
        <InputGroup>
          <InputGroup.Button>
            <Button onClick={this.props.searchClick}>
              <Glyphicon glyph="search" aria-label="Search"/>
            </Button>
          </InputGroup.Button>
          <FormControl type="text" placeholder="Search..." onChange = {this.props.handleChange}/>
        </InputGroup>
      </Form>
    );
  }
}
