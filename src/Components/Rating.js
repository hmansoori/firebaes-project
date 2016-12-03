import React from 'react'
//import StarRating from 'react-star-rating'
import {ButtonToolbar, Button, Modal } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
//$ npm install react-star-rating --save
//<link rel="stylesheet" href="node_modules/react-star-rating/dist/css/react-star-rating.min.css"> in css file

class Rating extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            rating: 1
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
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
                                    name="rate1" 
                                    starCount={5}
                                    value={rating}
                                />
                                <p>Source: </p>
                                <StarRatingComponent 
                                    name="rate2" 
                                    starCount={5}
                                    value={rating}
                                />
                                <p>Content: </p>
                                <StarRatingComponent 
                                    name="rate3" 
                                    starCount={5}
                                    value={rating}
                                />
                            </div>
                            <label>Your Review<input type="text"/></label>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                        <button type="submit" className="btn btn-primary">Submit Rating</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default Rating;

