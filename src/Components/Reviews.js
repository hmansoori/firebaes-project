import React from 'react'

export default class Reviews extends React.Component {

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
        <ul className='reviews-list'>
          <li className='review-item'>Author Rating: <span className={authorClass}>{author}</span></li>
          <li className='review-item'>Content Rating: <span className={contentClass}>{content}</span></li>
          <li className='review-item'>Source Rating: <span className={sourceClass}>{source}</span></li>
        </ul>
        <div className='review-text'>
          <br/>
          <p><span className='reasoning'>Reasoning: </span>{this.props.review.text}</p>
          <br/>
        </div>
        <p className='reviewed-by'>Reviewed by: {this.props.review.userId}</p>
      </div>
    );
  }
}
