import React from 'react';
import Rating from './Rating';
//import PostController from './PostController';
import { Col, Form, FormControl, InputGroup, Button, Glyphicon, Image, PageHeader } from 'react-bootstrap';
import { hashHistory, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase';
import StarRatingComponent from 'react-star-rating-component';

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
          source: childVal.source
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
      return <ArticleCard userId={this.props.userId} articleId={article.id} article={article} title={article.title} author={article.author} link={article.link} ratings={article.ratings} source={article.source} />
    });

    return (
      <div className="background">
        <div className="container" >
          <header role="banner">
            <h1 className= 'font-color'>Articles </h1>
          </header>
          <main role="main">

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
      <div>
        <Col xs={8} xsOffset={2} smOffset={0} sm={6} md={4}>
          <Link to={{ pathname: '/article/' + this.props.articleId }}>
            <div className='article-card'>
              <div className='article-detail'>
                <h2>{this.props.title}</h2>
                <h5>{this.props.author}</h5>
                <h5>{this.props.source}</h5>
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
      reviews: []
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
    });
  }

  componentWillUnmount() {
    var component = this;
        firebase.database().ref('articles/' + component.props.params.articleId).off();
        firebase.database().ref('reviews/' + component.props.params.articleId).off();


  }
  render() {
    var authorRating = 0;
    var sourceRating = 0;
    var contentRating = 0;
    var fullRating = 0;

    var reviewList = this.state.reviews.map((review) => {
      authorRating += review.authorRating;
      sourceRating += review.sourceRating;
      contentRating += review.contentRating;

      return <Reviews review={review}
        key={review.key} />
    })
    authorRating = authorRating / this.state.reviews.length;
    sourceRating = sourceRating / this.state.reviews.length;
    contentRating = contentRating / this.state.reviews.length;
    fullRating = (authorRating + sourceRating + contentRating) /3;
    //var review = firebase.database().ref('articles/' + this.props.params.articleId ).set({rating: fullRating});
     



    return (
      
      <div className='article-card'>
        <div className='article-detail'>
          <PageHeader>{this.state.article.title}</PageHeader>
          <h5>{this.state.article.author}</h5>
          <h5>{this.state.article.source}</h5>
          <h5><a href={this.state.article.link}>{this.state.article.link}</a></h5>
          <h6>author rating: {authorRating}</h6>
          <h6>source rating: {sourceRating}</h6>
          <h6>content rating: {contentRating}</h6>
          <h6>full rating: {fullRating}/5</h6>
          <Rating className='rate-button' articleId={this.props.params.articleId} userId={this.props.userId} />
        </div>
        
        {reviewList}
      </div>
    )
  }
}

class Reviews extends React.Component {


  render() {

    return (
      <div className='user-reviews'>
        <div>
          <p>Author Rating: </p>
          <StarRatingComponent name="rate" editing={false} starCount={5} value={this.props.review.authorRating}/>
          <p>Content Rating: {this.props.review.contentRating}</p>
          <StarRatingComponent name="rate" editing={false} starCount={5} value={this.props.review.contentRating}/>
          <p>Source Rating: {this.props.review.sourceRating}</p>
          <StarRatingComponent name="rate" editing={false} starCount={5} value={this.props.review.sourceRating}/>
          <p>Reasoning: {this.props.review.text}</p>
        </div>
      </div>
    );
  }
}

export default ArticleList;