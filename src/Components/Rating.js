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
            rating: 0,
            authorRating: 0,
            sourceRating: 0,
            contentRating: 0,
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
    x() {
        
    }
    check() {

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
                                inactiveLabel={<X/>}
                                activeLabel={<Check/>}
                                value={self.state.value}
                                onToggle={(value) => {
                                    if(value == 0){
                                        self.setState({
                                        value: 1,
                                    })} else {
                                        self.setState({
                                        value: 0,
                                    })
                                    }
                                }} />
                                <p>Source: </p>
                                <ToggleButton
                                inactiveLabel={<X/>}
                                activeLabel={<Check/>}
                                value={self.state.value}
                                onToggle={(value) => {
                                    if(value == 0){
                                        self.setState({
                                        value: 1,
                                    })} else {
                                        self.setState({
                                        value: 0,
                                    })
                                    }
                                }} />
                                <p>Content: </p>
                                <ToggleButton
                                inactiveLabel={<X/>}
                                activeLabel={<Check/>}
                                value={self.state.value}
                                onToggle={(value) => {
                                    if(value == 0){
                                        self.setState({
                                        value: 1,
                                    })} else {
                                        self.setState({
                                        value: 0,
                                    })
                                    }
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

