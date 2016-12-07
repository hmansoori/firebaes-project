import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';


class Reviews extends React.Component {

  render() {
    var author = '';
    var content = '';
    var source = '';
    var authorClass = '';
    var contentClass = '';
    var sourceClass = '';

    if (this.props.review.authorRating == 1) {
      author = 'Trustworthy';
      authorClass = 'green';
    } else {
      author = 'Not Trustworthy';
      authorClass = 'red';
    }
    if (this.props.review.contentRating == 1) {
      content = 'Trustworthy';
      contentClass = 'green';
    } else {
      content = 'Not Trustworthy';
      contentClass = 'red';
    }
    if (this.props.review.sourceRating == 1) {
      source = 'Trustworthy';
      sourceClass = 'green';
    } else {
      source = 'Not Trustworthy';
      sourceClass = 'red';
    }
    return (
      <div className='user-reviews animated zoomIn'>
        <p>Reviewed by, {this.props.user}</p>
        <ul className='reviews-list'>
          <li className='review-item'>Author Rating: <span className={authorClass}>{author}</span></li>
          <li className='review-item'>Content Rating: <span className={contentClass}>{content}</span></li>
          <li className='review-item'>Source Rating: <span className={sourceClass}>{source}</span></li>
        </ul>
        <div className='review-text'>
          <p>Reasoning: <span className='review-text'>{this.props.review.text}</span></p>
        </div>
      </div>
    );
  }
}
