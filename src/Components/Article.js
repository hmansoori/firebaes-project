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
      var articleObj = {};
      var articleArray=[];
      snapshot.forEach((child) => {
        var article= {};
        article.link = child.val().link;
        article.author = child.val().author;
        article.title = child.val().title;
        article.source = child.val().source;
        articleArray.push(article);
      })
      this.setState({articles: articleArray});
    })
  }

  componentWillUnmount() {
    firebase.database().ref('articles').off();
  }

  render() {
    var articleItems = this.state.articles.map((article) => {
      return <ArticleCard key={article.key} article={article} title={article.title} author={article.author} link={article.link} ratings={article.ratings} source={article.source}/>
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
        <Rating key={this.props.key} userId={this.props.userId}/>
      </div>
    );
  }

}


export default ArticleList;