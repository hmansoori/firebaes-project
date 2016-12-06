import React from 'react'
import Toggle from 'react-toggle'
import {ButtonToolbar, Button, Modal } from 'react-bootstrap';
import firebase from 'firebase';
import '../css/toggle.css';
import firebase from 'firebase';

export default class Rating extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            authorRating: 0,
            sourceRating: 0,
            contentRating: 0,

            value: ''
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }

    handleChange(event) {
        var checked = event.target.checked ? 1 : 0;
        this.setState({[event.target.id]: checked});
    }

    handleText(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        
        var review = {
            authorRating: this.state.authorRating,
            sourceRating: this.state.sourceRating,
            contentRating: this.state.contentRating,
            text: this.state.value
        }
        var articleId = this.props.articleId;
        var userReview = {
            [articleId]: true
        }
        console.log(this.props.userId, 'userid');
        console.log(this.props.articleId, 'articleid')
        
        // add to the article reviews object at the articleId
        firebase.database().ref('/reviews/' + this.props.articleId + '/' + this.props.userId).set(review);
        // create an index at the current user 
        firebase.database().ref('/users/' + this.props.userId +'/reviews').set(userReview);
    }

    render() {
        
        //console.log(this.props.articleKey);
        return (
            <div>
                <Button bsStyle="primary" onClick={this.showModal}>
                    Rate it
                </Button>
                <Modal show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Rate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <div>
                                    <label>
                                      <Toggle id="authorRating"
                                        defaultChecked={this.state.authorRating}
                                        onChange={this.handleChange} />
                                      <span>Author</span>
                                    </label>
                                      
                                <label>
                                      <Toggle id="sourceRating"
                                        defaultChecked={this.state.sourceRating}
                                        onChange={this.handleChange} />
                                      <span>Source</span>
                                    </label>
                                <label>
                                      <Toggle id="contentRating"
                                        defaultChecked={this.state.contentRating}
                                        onChange={this.handleChange} />
                                      <span>Content</span>
                                    </label>
                            </div>
                            <label>
                                Your Review:
                                <textarea value={this.state.value} onChange={this.handleText} />
                            </label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit Rating</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

