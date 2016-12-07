import React from 'react';
import Rating from './Rating';
import Reviews from './Reviews';
import { Col, Form, Button, } from 'react-bootstrap';
import { hashHistory, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase';
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
          user: childVal.username
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
            <h1 className='font-color'>Articles <i class="fa fa-newspaper-o" aria-hidden="true"></i></h1> 
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
    var classType = '';
    if (Number(this.props.rating.slice(0,4)) >= 80) {
      classType = 'green';
    }
    else if (Number(this.props.rating.slice(0,4)) >= 50) {
      classType = 'yellow';
    }
    else {
      classType = 'red';
    }
    return (

      <div className='animated fadeIn' >
        <Col xs={8} xsOffset={2} smOffset={0} sm={6} md={4}>
          <Link to={{ pathname: '/article/' + this.props.articleId }}>
            <div className='article-card '>
              <div className='article-detail animated fadeIn'>
                <p className='article-card-title'>{this.props.title}</p>
                <p className='author-source'>By {this.props.author}| {this.props.source}</p>
                <p className={classType}>{this.props.rating}</p>
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
    firebase.database().ref('articles/' + component.props.params.articleId).once('value').then(function (snapshot) {
      var articleDetails = {
        title: snapshot.val().title,
        author: snapshot.val().author,
        link: snapshot.val().link,
        source: snapshot.val().source,
        articleUserId: snapshot.val().userId,
        user: snapshot.val().username
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
    if (this.state.reviews.length > 0) {

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
      fullRating = ((authorRating + sourceRating + contentRating) / 3).toFixed(2).toString() + '% Trustworthy';
      authorRating = authorRating.toFixed(2).toString() + '% Trustworthy';
      sourceRating = sourceRating.toFixed(2).toString() + '% Trustworthy';
      contentRating = contentRating.toFixed(2).toString() + '% Trustworthy';

      firebase.database().ref('articles/' + this.props.params.articleId).update({ rating: fullRating });
    }
    else {
      var authorRating = 'Not Rated';
      var sourceRating = 'Not Rated';
      var contentRating = 'Not Rated';
      var fullRating = 'Not Rated';
    }

    var classType = '';
    if (Number(fullRating.slice(0,4)) >= 80) {
      classType = 'green';
    }
    else if (Number((fullRating).slice(0,4)) >= 50) {
      classType = 'yellow';
    }
    else {
      classType = 'red';
    }

   
    return (
      <div className="container" >
        <h1 className='font-color'>Article </h1>

        <div className='article-card animated fadeIn'>

          <div className='article-full'>
            <h1>{this.state.article.title}</h1>
            <p className='article-author-source'>By: {this.state.article.author}| {this.state.article.source}</p>
            <p className='article-link'>Read Here: <a href={this.state.article.link}>{this.state.article.link}</a></p>
            <br/>
            <p className='article-fullRating'>Overall rating: <span className={classType}>{fullRating}% Trustworthy</span></p>
            <p className='individual-rating'>Author rating: {authorRating}% Trustworthy  /  Source rating: {sourceRating}% Trustworthy  /  Content rating: {contentRating}% Trustworthy</p>
            <p> Posted by: <Link to={'/user/' + this.state.article.articleUserId }>{this.state.article.user}</Link></p>

          </div>
          <Rating articleId={this.props.params.articleId} userId={this.props.userId} />
          <h1 className='font-color'>Reviews </h1>

          {reviewList}

        </div>

      </div>
    )
  }
}

export default ArticleList;