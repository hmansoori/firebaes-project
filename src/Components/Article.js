import React from 'react';
import Rating from './Rating';
//import PostController from './PostController';
import { Col, Form, Button, } from 'react-bootstrap';
import { hashHistory, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase';
import StarRatingComponent from 'react-star-rating-component';
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
      articleArray.sort((a, b) => b.time - a.time);

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

class ArticleCard extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    var classType = '';
    if (this.props.rating >= 80) {
      classType = 'green';
    }
    else if (this.props.rating >= 50) {
      classType = 'yellow';
    }
    else {
      classType = 'red';
    }
    return (

      <div className='animated fadeinUp' >
        <Col xs={8} xsOffset={2} smOffset={0} sm={6} md={4}>
          <Link to={{ pathname: '/article/' + this.props.articleId }}>
            <div className='article-card '>
              <div className='article-detail animated fadeInUpBig'>
                <p className='article-card-title'>{this.props.title}</p>
                <p className='author-source'>By {this.props.author}| {this.props.source}</p>
                <p className={classType}>{this.props.rating}% Trustworthy</p>
                <p>posted by: {this.props.user}</p>
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
    firebase.database().ref('articles/' + component.props.params.articleId).on('value', (snapshot) => {
      var articleDetails = {
        title: snapshot.val().title,
        author: snapshot.val().author,
        link: snapshot.val().link,
        source: snapshot.val().source,
        user: snapshot.val().userId,
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
      reviewArray.sort((a, b) => b.time - a.time);
      this.setState({ reviews: reviewArray });

    });
  }

  componentWillUnmount() {
    var component = this;
    firebase.database().ref('articles/' + component.props.params.articleId).off();
    firebase.database().ref('reviews/' + component.props.params.articleId).off();
  }

  handleTest(e) {
    this.setState({ test: true });
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

    var classType = '';
    if (fullRating >= 80) {
      classType = 'green';
    }
    else if (fullRating >= 50) {
      classType = 'yellow';
    }
    else {
      classType = 'red';
    }


    return (
      <div className="container" >
        <h1 className='font-color'>Article </h1>

        <div className='article-card animated zoomIn'>

          <div className='article-full'>
            <h1>{this.state.article.title}</h1>
            <p className='article-author-source'>By: {this.state.article.author}| {this.state.article.source}</p>
            <p className='article-link'>Read Here: <a href={this.state.article.link}>{this.state.article.link}</a></p>
            <br/>
            <p className='article-fullRating'>Overall rating: <span className={classType}>{fullRating}% Trustworthy</span></p>
            <p className='individual-rating'>Author rating: {authorRating}% Trustworthy  /  Source rating: {sourceRating}% Trustworthy  /  Content rating: {contentRating}% Trustworthy</p>
            <p> Posted by: {this.state.article.user}</p>
          </div>
          <Rating articleId={this.props.params.articleId} userId={this.props.userId} />
          <h1 className='font-color'>Reviews </h1>

          {reviewList}

        </div>
      </div>
    )
  }
}

class Reviews extends React.Component {

  render() {
    var author = '';
    var content = '';
    var source = '';
    var authorClass = '';
    var contentClass = '';
    var sourceClass = '';

    if (this.props.review.authorRating === 1) {
      author = 'Trustworthy';
      authorClass = 'green';
    } else {
      author = 'Not Trustworthy';
      authorClass = 'red';
    }
    if (this.props.review.contentRating === 1) {
      content = 'Trustworthy';
      contentClass = 'green';
    } else {
      content = 'Not Trustworthy';
      contentClass = 'red';
    }
    if (this.props.review.sourceRating === 1) {
      source = 'Trustworthy';
      sourceClass = 'green';
    } else {
      source = 'Not Trustworthy';
      sourceClass = 'red';
    }
    return (
      <div className='container'>
        <div className='user-reviews animated zoomIn'>
          <ul className='reviews-list'>
            <li className='review-item'>Author Rating: <span className={authorClass}>{author}</span></li>
            <li className='review-item'>Content Rating: <span className={contentClass}>{content}</span></li>
            <li className='review-item'>Source Rating: <span className={sourceClass}>{source}</span></li>
          </ul>
          <div>
            <br/>
            <p><span className='reasoning'>Reasoning: </span>{this.props.review.text}</p>
          </div>
          <p>Reviewed by: {this.props.user}</p>
        </div>
      </div>
    );
  }
}

export default ArticleList;