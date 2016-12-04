import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import {Col, Image, Form, FormControl, FormGroup, InputGroup, Button, Glyphicon, ListGroup, ListGroupItem, Navbar, Nav, NavItem} from 'react-bootstrap';
import firebase from 'firebase';
import { LinkContainer } from 'react-router-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { userId: undefined };
  }
  
  componentDidMount() {
    /* Add a listener and callback for authentication events */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //console.log('Auth state changed: logged in as', user.email);
        this.setState({ userId: user.uid });
        this.getUsername(user.uid);
      }
      else {
        //console.log('Auth state changed: logged out');
        this.setState({ userId: null }); //null out the saved state

      }
    })
  }
  
  getUsername(uid) {
    firebase.database().ref('users/' + uid).once('value', (snapshot) =>{
      this.setState({username: snapshot.val().handle});
    });
  }
  //A callback function for logging out the current user
  signOut() {
    /* Sign out the user, and update the state */
    firebase.auth().signOut();
  }
  
  // render() {
  //   return (
  //     <div className="App">
  //       <div className="App-header">
  //         <h1>News Reviews</h1>
  //         {!this.state.userId &&
  //           <div className="login">
  //             <button className="btn btn-primary"><Link to='login'>Login</Link></button>
  //           </div>  
  //         }
  //         {this.state.userId &&  /*inline conditional rendering*/
  //           <div className="logout">
  //             <button className="btn btn-warning" onClick={() => this.signOut() }>Sign out {firebase.auth().currentUser.displayName}</button>
  //           </div>
  //         }
  //        </div>
  //       {this.props.children}
  //     </div>
  //   );
  // }
  render() {
    const children = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       userId: this.state.userId
     })
    );
    if(this.state.userId === undefined)
      return <div>NOT READY</div>;
    return ( 
      <div>
        <NavControl userId={this.state.userId} username={this.state.username} handleSignOut={this.signOut}/>
        {children}
      </div>

    )    
  }
}

class NavControl extends React.Component {
  handleChange(event){
    console.log(event.target.value)
  }

  render() {
    
    var conditional = !this.props.userId ? 
          <Nav pullRight>
            <LinkContainer to={{ pathname: '/login'}}>
              <NavItem eventKey={1} >Login</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/signup'}}>
              <NavItem eventKey={2} >Sign Up</NavItem>
            </LinkContainer>
          </Nav>
          :
          <Nav pullRight>
            <LinkContainer to={{ pathname: '/user/' + this.props.username}}>
              <NavItem eventKey={3} >{this.props.username}</NavItem>
            </LinkContainer>
            <NavItem eventKey={4} onClick={this.props.handleSignOut}>Log Out</NavItem>
          </Nav>
            
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">McScuuuuuuuse Me?</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" onChange={this.handleChange}/>
            </FormGroup>
            {' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
            {conditional} 
        </Navbar.Collapse>
      </Navbar>
    )
    
  }
}
class Search extends React.Component {
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
