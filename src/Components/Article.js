import React from 'react';
import Rating from './Rating.js';
//import PostController from './PostController';
import {Col, Form, FormControl, InputGroup, Button, Glyphicon, Image,PageHeader} from 'react-bootstrap';

import firebase from 'firebase';
import '../css/article.css';



class ArticleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { articles: [] };
  }

  componentDidMount() {
    var articleRef = firebase.database().ref('articles');
    articleRef.on('value', (snapshot) => {
      
      var articleArray=[];
      snapshot.forEach((child) => {
        var childVal = child.val();
        var article= {
          id: child.key,
          link: childVal.link,
          author: childVal.author,
          title: childVal.title,
          source: childVal.source
        };
        // article.key = child.key;
        // article.link = child.val().link;
        // article.author = child.val().author;
        // article.title = child.val().title;
        // article.source = child.val().source;
        articleArray.push(article);
      });
      this.setState({articles: articleArray});

    });

    
    
    var userReviews = firebase.database().ref('/users/' + this.props.userId +'/reviews');
    userReviews.on('value', (snapshot) => {
      this.setState({userReviews: snapshot.val()});
    });
    
  }

  componentWillUnmount() {
    firebase.database().ref('articles').off();
    firebase.database().ref('/users/' + this.props.userId +'/reviews').off();
  }

  render() {
    
    var articleItems = this.state.articles.map((article) => {
      var rated = this.state.userReviews[article.id] ? true : false;
      return <ArticleCard rated={rated} userId={this.props.userId} articleId={article.id} article={article} title={article.title} author={article.author} link={article.link} ratings={article.ratings} source={article.source}/>
    })
    return (
      <div className ="background">
        <div className= "container" >
          <header role="banner">
            <h1>Articles </h1>
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

  render() {

    return (

      <div className='article-card'>
        <div className = 'article-detail'>
          <PageHeader>{this.props.title}</PageHeader>
          <h5>{this.props.author}</h5>
          <h5>{this.props.source}</h5>
        </div>
        {
          this.props.rated ?
          <Rating articleId={this.props.articleId} userId={this.props.userId}/>
          : <button>edit it</button>
        }
        
      </div>
    );
  }

}


export default ArticleList;