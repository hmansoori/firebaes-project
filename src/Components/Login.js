
import React from 'react';
import noUserPic from './img/no-user-pic.png';
import {Link, Router,Route,hashHistory, IndexRoute} from 'react-router';

import firebase from 'firebase';

/**
 * A form for signing up and logging into a website.
 * Specifies email, password, user handle, and avatar picture url.
 * Expects `signUpCallback` and `signInCallback` props
 */
class SignInForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle':undefined,
      'avatar':''
    }; 

    //function binding
    this.handleChange = this.handleChange.bind(this);
  }

  //update state for specific field
  handleChange(event) {
    var field = event.target.name;
    var value = event.target.value;

    var changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

   signInCallback(email, password) {
    /* Sign in the user */
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => console.log(err));
            //hashHistory.push('/channels/general');

  }


  //handle signIn button
  signIn(event) {
    event.preventDefault(); //don't submit
    this.signInCallback(this.state.email, this.state.password);
  }

  /**
   * A helper function to validate a value based on a hash of validations
   * second parameter has format e.g., 
   * {required: true, minLength: 5, email: true}
   * (for required field, with min length of 5, and valid email)
   */
  validate(value, validations) {
    var errors = {isValid: true, style:''};
    
    if(value !== undefined){ //check validations
      //handle required
      if(validations.required && value === ''){
        errors.required = true;
        errors.isValid = false;
      }

      //handle minLength
      if(validations.minLength && value.length < validations.minLength){
        errors.minLength = validations.minLength;
        errors.isValid = false;
      }

      //handle email type ??
      if(validations.email){
        //pattern comparison from w3c
        //https://www.w3.org/TR/html-markup/input.email.html#input.email.attrs.value.single
        var valid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
        if(!valid){
          errors.email = true;
          errors.isValid = false;
        }
      }
    }

    //display details
    if(!errors.isValid){ //if found errors
      errors.style = 'has-error';
    }
    else if(value !== undefined){ //valid and has input
      //errors.style = 'has-success' //show success coloring
    }
    else { //valid and no input
      errors.isValid = false; //make false anyway
    }
    return errors; //return data object
  }

  render() {
    //field validation
    var emailErrors = this.validate(this.state.email, {required:true, email:true});
    var passwordErrors = this.validate(this.state.password, {required:true, minLength:6});
    var handleErrors = this.validate(this.state.handle, {required:true, minLength:3});

    //button validation
    var signUpEnabled = (emailErrors.isValid && passwordErrors.isValid && handleErrors.isValid);
    var signInEnabled = (emailErrors.isValid && passwordErrors.isValid);

    return (
      <form role="form" className="sign-up-form">
        <ValidatedInput field="email" type="email" label="Email" changeCallback={this.handleChange} errors={emailErrors} />
        <ValidatedInput field="password" type="password" label="Password" changeCallback={this.handleChange} errors={passwordErrors} />        
         <div className="form-group sign-up-buttons">
          <button aria-label="Sign in" aria-live="polite" type='submit' className="btn btn-success" disabled={!signInEnabled} onClick={(e) => this.signIn(e)}>Sign-in</button>
           <p>haven't joined yet?</p>
          <button aria-label="Sign up" aria-live="polite" className ="btn btn-success"><Link className="Link"to="/join" >Join</Link></button>
        </div>
      </form>
    );
  }
}
//A component that displays an input form with validation styling
//props are: field, type, label, changeCallback, errors
class ValidatedInput extends React.Component {
  render() {
    return (
      <div className={"form-group "+ this.props.errors.style}>
        <label htmlFor={this.props.field} className="control-label">{this.props.label}</label>
        <input id={this.props.field} type={this.props.type} name={this.props.field} className="form-control" onChange={this.props.changeCallback} />
        <ValidationErrors errors={this.props.errors} />
      </div>
    );
  }  
}
//a component to represent and display validation errors
class ValidationErrors extends React.Component {
  render() {
    return (
      <div>
        {this.props.errors.required &&
          <p className="help-block">Required!</p>
        }
        {this.props.errors.email &&
          <p className="help-block">Not an email address!</p>
        }
        {this.props.errors.minLength &&
          <p className="help-block">Must be at least {this.props.errors.minLength} characters.</p>        
        }
      </div>
    );
  }
}
//simple wrapper for displaying the form
class SignUpApp extends React.Component {
  //basic callbacks to prove things work!
  signUp(email, password, handle, avatar) {
    window.alert("Signing up:", email, 'with handle', handle);
  }
  signIn(email, password) {
    window.alert("Signing in:", email);
  }
  render() {
    return (
      <div className="container">
        <header role="banner">
          <h1>Sign Up!</h1>
        </header>
        <SignInForm signUpCallback={this.signUp} signInCallback={this.signIn} />
      </div>
    );
  }
}
export { SignUpApp }; //for testing/demonstration
export default SignInForm;