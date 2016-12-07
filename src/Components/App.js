import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import { Form, FormControl, FormGroup, InputGroup, Button, Glyphicon, Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
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
        console.log('Auth state changed: logged in as', user.uid);
        this.setState({ userId: user.uid });
        this.getUser(user.uid);
      }
      else {
        console.log('Auth state changed: logged out');
        this.setState({ userId: null, user: null }); //null out the saved state
      }
    });

  }

  getUser(uid) {
    firebase.database().ref('users/' + uid).once('value', (snapshot) => {
      this.setState({
        username: snapshot.val().handle,
        user: snapshot.val()
      });

    });
  }

  //A callback function for logging out the current user
  signOut() {
    /* Sign out the user, and update the state */
    firebase.auth().signOut();
  }

  render() {
    const children = React.Children.map(this.props.children,

     (child) => React.cloneElement(child, {
       userId: this.state.userId,
       user: this.state.user,
       username : this.state.username
     })
    );

    if (this.state.userId === undefined)
      return null;

    return (
      <div className='background'>
        <NavControl userId={this.state.userId} username={this.state.username} handleSignOut={this.signOut} />
        {children}
      </div>

    )
  }
}

class NavControl extends React.Component {

  constructor(){
    super();
    this.state = {
      dropdown: 'articles',
      query: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event){
    console.log(event.target.value)
    this.setState({query: event.target.value});
  }

  handleSelect(event){
    this.setState({dropdown: event})
    console.log(event);
  }

  render() {

    //console.log(this.props.userId);
    var conditional = !this.props.userId ? 
          <Nav pullRight >
            <LinkContainer to={{ pathname: '/about'}}>
              <NavItem eventKey={6} >About</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/login'}} >
              <NavItem eventKey={2} >Login</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/signup'}} >
              <NavItem eventKey={3} >Sign Up</NavItem>
            </LinkContainer>  
          </Nav>
          :
          <Nav pullRight >
            <LinkContainer to={{ pathname: '/about'}}>
              <NavItem eventKey={6} >About</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/submit'}} >
              <NavItem eventKey={1} >Add Article</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/user/' + this.props.userId}}>
              <NavItem eventKey={4} >{this.props.username}</NavItem>
            </LinkContainer >
            <LinkContainer to={{ pathname: '/'}}>
            <NavItem eventKey={5} onClick={this.props.handleSignOut}>Log Out</NavItem>
            </LinkContainer>
          </Nav>
            
    return(
      <Navbar >
        <Navbar.Header >
          <Navbar.Brand >
            <a href="#">TruthFeed</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft >
            
              <InputGroup>
                <FormControl type="text" placeholder="Search" onChange={this.handleChange} />
                <DropdownButton 
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title={this.state.dropdown}
                  onSelect={this.handleSelect}
                >
                  <MenuItem eventKey="users" id="users-drop" >users</MenuItem>
                  <MenuItem eventKey="articles" id="articles-drop" >articles</MenuItem>
                </DropdownButton>
              </InputGroup>
            
            {' '}
            <LinkContainer to={{ pathname: '/search/', query: { [this.state.dropdown] : this.state.query } }}>
              <Button type="submit" >Submit</Button>
            </LinkContainer>
          </Navbar.Form>
          {conditional}
        </Navbar.Collapse>
      </Navbar>
    )

  }
}
