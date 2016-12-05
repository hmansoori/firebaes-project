import React from 'react';
//import PostController from './PostController';
import {Col, Form, FormControl, InputGroup, Button, Glyphicon, Image,PageHeader} from 'react-bootstrap';
import firebase from 'firebase';

import {hashHistory} from 'react-router';

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
      return <ArticleCard article={article} title={article.title} author={article.author} link={article.link} ratings={article.ratings} source={article.source}/>
    })
    return (
      <div className ="background">
        <div className= "container" >
          <header role="banner">
            <h1>Articles </h1>
          </header>
          <main role="main">
            <div >
              {articleItems}
            </div>
            <footer role="contentinfo">
            </footer>
          </main>
        </div>
      </div>
    );
  }
}

class ArticleCard extends React.Component {
  onClick(event) {
    //event.preventDefault();
    var articleTitle = this.props.title;
    //hashHistory.push('article/'+articleTitle);
  }

  render() {
    return (
      <Col xs={8} xsOffset={2} smOffset={0} sm={6} md={4}>
      <div className='article-card'>
      <div className = 'article-detail'>
        <h2>{this.props.title}</h2>
        <h5>Written By: {this.props.author}</h5>
        <h5>From: {this.props.source}</h5>
          <div >
            <p></p>
          </div>

      </div>
      </div>
      </Col>
    );
  }

}

export default ArticleList;