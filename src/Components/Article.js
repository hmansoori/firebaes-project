import React from 'react';
import Rating from './Rating';
import Reviews from './Reviews';
//import PostController from './PostController';
import { Col, Form, FormControl, InputGroup, Button, Glyphicon, Image, PageHeader } from 'react-bootstrap';
import { hashHistory, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase';
import StarRatingComponent from 'react-star-rating-component';

//import {fadeinUp} from 'animate.css';

import 'animate.css';


import '../css/article.css';


class ArticleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      render: false
    };
  }

  componentDidMount() {
    var articleRef = firebase.database().ref('articles');
    articleRef.on('value', (snapshot) => {

      var articleArray = [];
      snapshot.forEach((child) => {

        var childVal = child.val();
        var article = {
          id: child.key,
          link: childVal.link,
          author: childVal.author,
          title: childVal.title,
          source: childVal.source,
          rating: childVal.rating,
          user: childVal.userId
        };
        articleArray.push(article);
      });
      this.setState({ articles: articleArray });

    });


  }

  componentWillUnmount() {
    firebase.database().ref('articles').off();
    // firebase.database().ref('/users/' + this.props.userId + '/reviews').off();
  }

  render() {
    var articleItems = this.state.articles.map((article) => {
      //var rated = this.state.userReviews[article.id] ? true : false;
      return <ArticleCard userId={this.props.userId} articleId={article.id} article={article} title={article.title} author={article.author} link={article.link} ratings={article.ratings} source={article.source} rating={article.rating} user={article.user} />
    });

    return (
      <div className="background">
        <div className="container" >
          <header role="banner">
            <h1 className='font-color'>Articles </h1>
          </header>
          <main role="main" >
            {articleItems}
            <footer role="contentinfo">
            </footer>
          </main>
        </div>
      </div>
    );
  }
}

export class ArticleCard extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    var classType ='';
    if (this.props.rating >= 50) {
      classType = 'green';
    }
    else {
      classType = 'red';
    }
    return (

      <div className= 'animated fadeinUp' >
        <Col xs={8} xsOffset={2} smOffset={0} sm={6} md={4}>
          <Link to={{ pathname: '/article/' + this.props.articleId }}>
            <div className='article-card '>
              <div className='article-detail animated fadeInUpBig'>
                <p>posted by: {this.props.user}</p>
                <p className='article-card-title'>{this.props.title}</p>
                <p className='author-source'>By {this.props.author} | {this.props.source}</p>
                <p className={classType}>{this.props.rating}% Trustworthy</p>
              </div>
            </div>
          </Link>
        </Col>
      </div>
    );
  }

}

export class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {},
      reviews: [],
      reviewList: [],
      authorRating: '',
      sourceRating: '',
      contentRating: '',
      fullRating: ''

    };

  }

  componentDidMount() {
    var component = this;
    firebase.database().ref('articles/' + component.props.params.articleId).once('value').then(function (snapshot) {
      var articleDetails = {
        title: snapshot.val().title,
        author: snapshot.val().author,
        link: snapshot.val().link,
        source: snapshot.val().source,
        user: snapshot.val().userId
      };
      component.setState({ article: articleDetails });

    });

    var reviewRef = firebase.database().ref('reviews/' + component.props.params.articleId);
    reviewRef.on('value', (snapshot) => {
      var reviewArray = [];
      snapshot.forEach(function (child) {
        var review = child.val();
        reviewArray.push(review);
      });
      this.setState({ reviews: reviewArray });

    });
  }

  componentWillUnmount() {
    var component = this;
    firebase.database().ref('articles/' + component.props.params.articleId).off();
    firebase.database().ref('reviews/' + component.props.params.articleId).off();
  }
  
  handleTest(e) {
    this.setState({test: true});
  }

  render() {
    // here
      var authorRating = 0;
      var sourceRating = 0;
      var contentRating = 0;
      var fullRating = 0;

      var reviewList = this.state.reviews.map((review) => {
        authorRating += review.authorRating;
        sourceRating += review.sourceRating;
        contentRating += review.contentRating;

        return <Reviews review={review}
          key={review.key}
          user={review.userId} />
      })

      authorRating = ((authorRating / (this.state.reviews.length)) * 100);
      sourceRating = ((sourceRating / (this.state.reviews.length)) * 100);
      contentRating = (contentRating / (this.state.reviews.length)) * 100;
      fullRating = ((authorRating + sourceRating + contentRating) / 3).toFixed(2);
      authorRating = authorRating.toFixed(2);
      sourceRating = sourceRating.toFixed(2);
      contentRating = contentRating.toFixed(2);
      firebase.database().ref('articles/' + this.props.params.articleId).update({ rating: fullRating });

    return (
      <div className='article-card animated zoomIn'>
        <div className='article-detail'>
          <h2>{this.state.article.title}</h2>
          <p> Posted by, {this.state.article.user}</p>
          <p>By, {this.state.article.author} | {this.state.article.source}</p>
          <p>Read Here: <a href={this.state.article.link}>{this.state.article.link}</a></p>
          <p>full rating: {this.state.fullRating}% Trustworthy</p>
          <p>author rating: {authorRating}% Trustworthy  /  source rating: {sourceRating}% Trustworthy  /  content rating: {contentRating}% Trustworthy</p>
        </div>
        <Rating className='rate-button' articleId={this.props.params.articleId} userId={this.props.userId} />
        {reviewList}
      </div>
    )
  }
}
export default ArticleList;