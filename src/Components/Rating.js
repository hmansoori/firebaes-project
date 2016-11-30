import React from 'react'
import StarRating from 'react-star-rating'
//$ npm install react-star-rating --save
//<link rel="stylesheet" href="node_modules/react-star-rating/dist/css/react-star-rating.min.css"> in css file

class Rating extends React.Component {
    getInitioalState() {
        return {show: false};
    }
    showModal() {
        this.setState({show: true});
    }
    hideModal() {
        this.setState({show: false});
    }

    render() {
        return (
            <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.showModal}>
                    Rate it
                </Button>
                <Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Rate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form target="_self" method="GET">
                            <StarRating name="react-star-rating" caption="Author" totalStars={5} />
                            <StarRating name="react-star-rating" caption="Source" totalStars={5} />
                            <StarRating name="react-star-rating" caption="Content" totalStars={5} />
                            <label>Your Review<input type="text"/></label>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-primary">Submit Rating</button>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}
React.render(<Rating />, document.getElementById('star-rating'));

