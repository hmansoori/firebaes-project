import React from 'react'

import StarRatingComponent from 'react-star-rating-component';
//import StarRating from 'react-star-rating'
import {ButtonToolbar, Button, Modal } from 'react-bootstrap';
//$ npm install react-star-rating --save
//<link rel="stylesheet" href="node_modules/react-star-rating/dist/css/react-star-rating.min.css"> in css file

export default class Rating extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            rating: 1,
            authorRating: 1,
            sourceRating: 1,
            contentRating: 1,
            value: ''
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    onStarClick(nextValue, prevValue, name) {
        
        this.setState({[name]: nextValue});
    }

    handleChange(event) {
        
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        
    }

    render() {
        const { rating } = this.state;

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
                        <form target="_self" method="GET">
                            <div>
                                <p>Author: </p>
                                <StarRatingComponent 


                                    name="authorRating" 
                                    starCount={5}
                                    value={this.state.authorRating}
                                    onStarClick={this.onStarClick}
                                />
                                <p>Source: </p>
                                <StarRatingComponent 
                                    name="sourceRating" 
                                    starCount={5}
                                    value={this.state.sourceRating}
                                    onStarClick={this.onStarClick}
                                />
                                <p>Content: </p>
                                <StarRatingComponent 
                                    name="contentRating" 
                                    starCount={5}
                                    value={this.state.contentRating}
                                    onStarClick={this.onStarClick}
                                />
                            </div>
                            <label>
                                Your Review:
                                <textarea value={this.state.value} onChange={this.handleChange} />
                            </label>
                        </form>
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

