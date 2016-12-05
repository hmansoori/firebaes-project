import React from 'react'

//import StarRatingComponent from 'react-star-rating-component';
//import StarRating from 'react-star-rating'
import {ButtonToolbar, Button, Modal } from 'react-bootstrap';
import firebase from 'firebase';
import ToggleButton from 'react-toggle-button'
//$ npm install react-star-rating --save
//<link rel="stylesheet" href="node_modules/react-star-rating/dist/css/react-star-rating.min.css"> in css file

export default class Rating extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            authorRating: false,
            sourceRating: false,
            contentRating: false,
            value: ''
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }
    /*onButtonClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    onButtonClick(nextValue, prevValue, name) {
        this.setState({[name]: nextValue});
    }*/

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.props.articleId)
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
        console.log(this.props.userId);
        
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
                                <p>Author: </p>
                                <ToggleButton
                                  value={ self.state.authorRating || false }
                                  onToggle={(value) => {
                                    self.setState({
                                      value: !value,
                                    })
                                  }} />

                                <p>Source: </p>
                                    <ToggleButton
                                      value={ self.state.sourceRating || false }
                                      onToggle={(value) => {
                                        self.setState({
                                          value: !value,
                                        })
                                      }} />

                                <p>Content: </p>
                                <ToggleButton
                                  value={ self.state.contentRating || false }
                                  onToggle={(value) => {
                                    self.setState({
                                      value: !value,
                                    })
                                  }} />
                            </div>
                            <label>
                                Your Review:
                                <textarea value={this.state.value} onChange={this.handleChange} />
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

