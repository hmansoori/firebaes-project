import React from 'react'
import Toggle from 'react-toggle'
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';
import firebase from 'firebase';
import '../css/toggle.css';

//Component for the rating modal 
export default class Rating extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            authorRating: 0,
            sourceRating: 0,
            contentRating: 0,
            userId: '',
            value: '',
            time: ''
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showModal() {
        this.setState({ show: true });
    }

    hideModal() {
        this.setState({ show: false });
    }

    handleChange(event) {
        var checked = event.target.checked ? 1 : 0;
        this.setState({ [event.target.id]: checked });
    }

    handleText(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        var review = {
            authorRating: this.state.authorRating,
            sourceRating: this.state.sourceRating,
            contentRating: this.state.contentRating,
            text: this.state.value,
            userId: firebase.auth().currentUser.displayName,
            time: firebase.database.ServerValue.TIMESTAMP
        }
      
        var articleId = this.props.articleId;

        var userReview = {
            [articleId]: true
        }

        // add to the article reviews object at the articleId
        firebase.database().ref('/reviews/' + this.props.articleId + '/' + this.props.userId).set(review);
        // create an index at the current user 
        firebase.database().ref('/users/' + this.props.userId +'/reviews').set(userReview);
        this.setState({show: false});
    }

    render() {
        //Renders the rating modal that is activated by the rate button on the article page
        return (
            <div className='button-pos'>
                <div>
                    <Button className='rate-button btn-default color' onClick={this.showModal}>
                        Rate this article
                    </Button>
                </div>
                <Modal show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header role= 'banner' closeButton>
                        <Modal.Title id="contained-modal-title">Rate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body role= 'main'>
                        <div>
                            <p>Please rate this article's validity (check for yes, 'x' for no):</p>
                            <div>
                                <label>
                                    <p>Is the author trustworthy?</p>
                                      <Toggle id="authorRating"
                                        
                                        defaultChecked={this.state.authorRating ? true : false}
                                        onChange={this.handleChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <p>Is the source trustworthy?</p>
                                      <Toggle id="sourceRating"
                                        defaultChecked={this.state.sourceRating ? true : false}
                                        onChange={this.handleChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                        <p>Is the content trustworthy?</p>
                                      <Toggle id="contentRating"
                                        defaultChecked={this.state.contentRating ? true : false}
                                        onChange={this.handleChange} />
                                </label>
                            </div>
                        </div>
                        <label>
                            Your Review:
                                <div>
                                <textarea value={this.state.value} onChange={this.handleText} />
                            </div>
                        </label>
                    </Modal.Body>
                    <Modal.Footer role= 'contentInfo'>
                        <Button onClick={this.hideModal}>Close</Button>
                        <button type="submit" className="btn-default color" onClick={this.handleSubmit}>Submit Rating</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


