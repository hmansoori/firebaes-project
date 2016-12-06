import React from 'react';
import Rating from './Rating';
//import PostController from './PostController';
import { Col, Form, FormControl, InputGroup, Button, Glyphicon, Image, PageHeader } from 'react-bootstrap';
import { hashHistory, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase';
import StarRatingComponent from 'react-star-rating-component';

import {fadeinUp} from 'animate.css';

import {fadeInUpBig, slideInUp, zoomIn} from 'animate.css';


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
          rating: childVal.rating
        };
        articleArray.push(article);
      });
      this.setState({ articles: articleArray });

    });

    // var userReviews = firebase.database().ref('/users/' + this.props.userId +'/reviews');
    // userReviews.on('value', (snapshot) => {
    //   this.setState({userReviews: snapshot.val()});
    // });

  }

  componentWillUnmount() {
    firebase.database().ref('articles').off();
    // firebase.database().ref('/users/' + this.props.userId + '/reviews').off();
  }

  render() {
    var articleItems = this.state.articles.map((article) => {
      //var rated = this.state.userReviews[article.id] ? true : false;
      return <ArticleCard userId={this.props.userId} articleId={article.id} article={article} title={article.title} author={article.author} link={article.link} ratings={article.ratings} source={article.source} rating={article.rating} />
    });

    return (
      <div className="background">
        <div className="container" >
          <header role="banner">
            <h1 className='font-color'>Articles </h1>
            <Link to='/submit'>Submit new article</Link>
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

class ArticleCard extends React.Component {
  // <<<<<<< HEAD
  //   onClick(event) {
  //     //event.preventDefault();
  //     var articleTitle = this.props.title;
  //     //hashHistory.push('article/'+articleTitle);
  //   }
  constructor(props) {
    super(props)
  }
  render() {

    return (

      <div className= 'animated fadeinUp' >
        <Col xs={8} xsOffset={2} smOffset={0} sm={6} md={4}>
          <Link to={{ pathname: '/article/' + this.props.articleId }}>
            <div className='article-card '>
              <div className='article-detail animated fadeInUpBig'>
                <p>{this.props.title}</p>
                <p>By {this.props.author} | {this.props.source}</p>
                <p>{this.props.rating}% Trustworthy</p>
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
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

  }

  componentWillMount() {
    var component = this;
    firebase.database().ref('articles/' + component.props.params.articleId).once('value').then(function (snapshot) {
      var articleDetails = {
        title: snapshot.val().title,
        author: snapshot.val().author,
        link: snapshot.val().link,
        source: snapshot.val().source
      };

      component.setState({ article: articleDetails });

    });


    var reviewRef = firebase.database().ref('reviews/' + component.props.params.articleId);
    reviewRef.on('value', (snapshot) => {
      var reviewArray = [];
      snapshot.forEach(function (child) {
        var review = child.val();
        console.log(review);
        reviewArray.push(review);
      });
      this.setState({ reviews: reviewArray });

      // here
      var authorRating = 0;
      var sourceRating = 0;
      var contentRating = 0;
      var fullRating = 0;
      console.log("REVIEWS STUFF")
      console.log(this.state.reviews);
      var reviewList = this.state.reviews.map((review) => {
        authorRating += review.authorRating;
        sourceRating += review.sourceRating;
        contentRating += review.contentRating;

        return <Reviews review={review}
          key={review.key} />
      })
      this.setState({ reviewList: reviewList });

      console.log(this.state.reviews.length);
      authorRating = ((authorRating / (this.state.reviews.length)) * 100);
      sourceRating = ((sourceRating / (this.state.reviews.length)) * 100);
      contentRating = (contentRating / (this.state.reviews.length)) * 100;
      fullRating = ((authorRating + sourceRating + contentRating) / 3).toFixed(2);
      authorRating = authorRating.toFixed(2);
      sourceRating = sourceRating.toFixed(2);
      contentRating = contentRating.toFixed(2);
      this.setState({ authorRating: authorRating, sourceRating: sourceRating, contentRating: contentRating, fullRating: fullRating });
      firebase.database().ref('articles/' + this.props.params.articleId).update({ rating: fullRating });
      //reviewRef.child('rating').set(fullRating);


    });
  }

  componentWillUnmount() {
    var component = this;
    firebase.database().ref('articles/' + component.props.params.articleId).off();
    firebase.database().ref('reviews/' + component.props.params.articleId).off();


  }
  render() {




    return (

      <div className='article-card animated zoomIn'>
        <div className='article-detail'>
          <h2>{this.state.article.title}</h2>
          <p>By, {this.state.article.author} | {this.state.article.source}</p>
          <p>Read Here: <a href={this.state.article.link}>{this.state.article.link}</a></p>
          <p>full rating: {this.state.fullRating}% Trustworthy</p>
          <p>author rating: {this.state.authorRating}% Trustworthy  /  source rating: {this.state.sourceRating}% Trustworthy  /  content rating: {this.state.contentRating}% Trustworthy</p>


        </div>
        <Rating className='rate-button' articleId={this.props.params.articleId} userId={this.props.userId} />
        {this.state.reviewList}
      </div>
    )
  }
}

class Reviews extends React.Component {

  render() {
    var author = '';
    var content = '';
    var source = '';
    var authorClass='';
    var contentClass='';
    var sourceClass='';

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
        <div className='reviews'>
          <p>Author Rating: <span className={authorClass}>{author}</span></p>
          <p>Content Rating: <span className={contentClass}>{content}</span></p>
          <p>Source Rating: <span className={sourceClass}>{source}</span></p>
          </div>
          <div className='review-text'>
          <p>Reasoning: <span className='review-text'>{this.props.review.text}</span></p>
          </div>
      </div>
    );
  }
}

export default ArticleList;