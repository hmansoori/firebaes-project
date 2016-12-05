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
        article.link = child.val().link.value;
        article.author = child.val().author.value;
        article.title = child.val().title.value;
        article.source = child.val().source.value;
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

      <div className='article-card'>
      <div className = 'article-detail'>
        <PageHeader><h3>{this.props.title}</h3></PageHeader>
        <h5>{this.props.author}</h5>
        <h5>{this.props.source}</h5>
          <div >
            <p></p>
          </div>

      </div>
      </div>
    );
  }

}

export default ArticleList;