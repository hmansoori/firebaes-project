import { Form, FormControl, InputGroup, Button, Glyphicon, Image } from 'react-bootstrap';
import firebase from 'firebase';
import React from 'react';
import {hashHistory} from 'react-router';


class ArticleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //track values and overall validity of each field
            title: { value: '', valid: false },
            author: { value: '', valid: false },
            source: { value: '', valid: false },
            link: { value: '', valid: false },
            rating: { value: '', valid: false },
            userId: { value: '', valid: false }
        };

        this.updateState = this.updateState.bind(this);
        this.articleSubmit = this.articleSubmit.bind(this);

    }

    articleSubmit(event) {
        event.preventDefault();
       

        var article = {
            title: this.state.title.value,
            author: this.state.author.value,
            source: this.state.source.value,
            link: this.state.link.value,
            userId: this.props.userId,
            username: this.props.username,
            //userId: firebase.auth().currentUser.displayName,
            rating: 'Not Rated'
        };
        
        // push the article and get the key so we can index it in the user firebase
        var articleRef = firebase.database().ref('articles');
        var articleKey = articleRef.push(article).key;
        // update the article index for that user
        firebase.database().ref('/users/' + this.props.userId + '/articles/' + articleKey).set(true);
        hashHistory.push('/article');

    }

    //callback for updating the state with child information
    updateState(stateChange) {
        this.setState(stateChange);
    }

    render() {
        //if all fields are valid, button should be enabled
        var buttonEnabled = (this.state.title.valid && this.state.author.valid && this.state.source.valid && this.state.link.valid);

        return (
            <div className="container animated fadeIn">
             <h1 className='font-color'>Submit Article </h1>
            <form name="articleform" onSubmit={(e) => this.handleSubmit(e)}>

                <RequiredInput
                    id="title" field="title" type="text"
                    label="Article Title" placeholder="..."
                    errorMessage="we need to know your article's title"
                    value={this.state.title.value}
                    updateParent={this.updateState} />

                <RequiredInput
                    id="author" field="author" type="text"
                    label="Article Author" placeholder="..."
                    errorMessage="we need to know your article's author"
                    value={this.state.author.value}
                    updateParent={this.updateState} />

                <RequiredInput
                    id="source" field="source" type="text"
                    label="Article Source" placeholder="..."
                    errorMessage="we need to know what organization published your article"
                    value={this.state.source.value}
                    updateParent={this.updateState} />

                <RequiredInput
                    id="link" field="link" type="text"
                    label="Article Link" placeholder="..."
                    errorMessage="we need to know where your article is"
                    value={this.state.link.value}
                    updateParent={this.updateState} />
                {/* Submit Buttons */}
                <div className="form-group">

                    <button id="submitButton" type="submit" className="submit-button btn-default color" onClick={this.articleSubmit} disabled={!buttonEnabled}>Submit Article</button>
                </div>
            </form>
            </div>
        );
    }
}


/**
 * A component representing a controlled input for an email address
 */

//A component representing a controlled input for a generic required field
class RequiredInput extends React.Component {
    validate(currentValue) {
        if (currentValue === '') { //check presence

            return { required: true, isValid: false };
        } else {
            return { isValid: true }; //no errors
        }

    }


    handleChange(event) {
        //check validity (to inform parent)
        var isValid = this.validate(event.target.value).isValid;
        //what to assign to parent's state
        var stateUpdate = {}
        stateUpdate[this.props.field] = {
            value: event.target.value,
            valid: isValid
        }

        this.props.updateParent(stateUpdate) //update parent state
    }

    render() {
        var errors = this.validate(this.props.value); //need to validate again, but at least isolated
        var inputStyle = 'form-group';
        if (!errors.isValid) inputStyle += ' invalid has-error';

        return (
            <div className={inputStyle}>
                <label htmlFor={this.props.field}>{this.props.label}</label>
                <input type={this.props.type} id={this.props.id} name={this.props.field} className="form-control" placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(e) => this.handleChange(e) }
                    />
                {!errors.isValid &&
                    <p className="help-block error-missing">{this.props.errorMessage}</p>
                }
            </div>
        );
    }
}



//exports: DO NOT REMOVE OR CHANGE THESE
export default ArticleForm;
export {RequiredInput};