import { Form, FormControl, InputGroup, Button, Glyphicon, Image } from 'react-bootstrap';
import firebase from 'firebase';
import React from 'react';


class ArticleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //track values and overall validity of each field
            email: { value: '', valid: false },
            name: { value: '', valid: false },
            dob: { value: '', valid: false },
            password: { value: '', valid: false },
            passwordConf: { value: '', valid: false }
        };

        this.updateState = this.updateState.bind(this); //bind for scope
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    //callback for updating the state with child information
    updateState(stateChange) {
        this.setState(stateChange);
    }

    //callback for the reset button
    handleReset(event) {

        var emptyState = {};

        var emptyState = {
            email: { value: '', valid: false },
            name: { value: '', valid: false },
            dob: { value: '', valid: false },
            password: { value: '', valid: false },
            passwordConf: { value: '', valid: false }
        };
        this.setState(emptyState);
    }

    //callback for the submit button
    handleSubmit(event) {
        event.preventDefault();

        this.props.submitCallback(this.state);
    }

    render() {
        //if all fields are valid, button should be enabled
        var buttonEnabled = (this.state.email.valid && this.state.name.valid && this.state.dob.valid && this.state.password.valid && !this.state.passwordConf.mismatched && this.state.passwordConf.valid);

        return (
            <form name="articleform" onSubmit={(e) => this.handleSubmit(e)}>

                <RequiredInput
                    id="title" field="title" type="text"
                    label="Article Title" placeholder="your article's title"
                    errorMessage="we need to know your article's title"
                    value={this.state.name.value}
                    updateParent={this.updateState} />

                <RequiredInput
                    id="author" field="author" type="text"
                    label="Article Author" placeholder="your article's author"
                    errorMessage="we need to know your article's author"
                    value={this.state.name.value}
                    updateParent={this.updateState} />

                <RequiredInput
                    id="source" field="source" type="text"
                    label="Article Source" placeholder="your article's source (NBC, CNN, etc.)"
                    errorMessage="we need to know your article's source"
                    value={this.state.password.value}
                    updateParent={this.updateState} />

                <RequiredInput
                    id="link" field="link" type="text"
                    label="Article Link" placeholder="your article link"
                    errorMessage="we need to know where your article is"
                    value={this.state.name.value}
                    updateParent={this.updateState} />
                {/* Submit Buttons */}
                <div className="form-group">

                    <button id="resetButton" type="reset" className="btn btn-default" onClick={(e) => this.handleReset(e)}>Reset</button> {' ' /*space*/}
                    <button id="submitButton" type="submit" className="btn btn-primary" disabled={!buttonEnabled}>Sign Me Up!</button>

                </div>

            </form>
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
                    onChange={(e) => this.handleChange(e)}
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