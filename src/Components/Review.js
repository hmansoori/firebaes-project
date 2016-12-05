import React from 'react'
import StarRatingComponent from 'react-star-rating-component';

export default class Reveiw extends React.Component {
  render(){
    return(
      <span>
        Author Rating: {this.props.authorRating}
        Source Rating: {this.props.sourceRating}
        Content Rating: {this.props.contentRating}
      </span>
    )
  }
}