import React, { Component } from 'react';
import update from 'immutability-helper';
import { ArticleCard } from './Article';
import firebase from 'firebase';
var _ = require('lodash');

export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      data: [],
      render: false

    }

    this.search = this.search.bind(this);
  }

  componentWillReceiveProps(){
    var db;
    var child;
    // if we are looking in articles
    if(this.props.location.query.articles){

      db = 'articles';
      child = 'title';
      this.setState({articles: true})


      var query = this.props.location.query.articles.toString().toLowerCase();

      var child1 = child;
      var ref = firebase.database().ref('articles');
      var list = [];
      ref.once("value", (snapshot) =>{
        snapshot.forEach((child)=> {
          if(_.includes(child.val().title.toLowerCase(), [query])){
            var newOne = {
              author: child.val().author,
              link: child.val().link,
              rating: child.val().rating,
              source: child.val().source,
              title: child.val().title,
              userId: child.val().userId, 
              username: child.val().username,
              articleId: child.key
            }
            list.push(newOne);
          }
        });
        this.setState({render: true});
      });
      
      this.setState({data: list});
    }
    else {
      db = 'users';
      child = 'handle';
      this.setState({users: true})
      var query = this.props.location.query.users.toString();

      var child1 = child;
      var ref = firebase.database().ref('users');
      var list = [];
      ref.once("value", (snapshot) =>{
        snapshot.forEach((child)=> {
          if(_.includes(child.val().handle, [query])){
            var newOne = {
              author: child.val().author,
              link: child.val().link,
              rating: child.val().rating,
              source: child.val().source,
              title: child.val().title,
              userId: child.val().userId, 
              username: child.val().username,
              articleId: child.key
            }
            list.push(newOne);
          }

        });
        this.setState({render: true});
      });
      
      this.setState({data: list});
    }

    // var query = this.props.location.query[db].toString();

    // var child1 = child;
    // var ref = firebase.database().ref(db);
    // var list = [];
    // ref.orderByChild(child).once("value", (snapshot) =>{
    //   snapshot.forEach((child)=> {
    //     if(_.includes(child.val()[child1], [query])){
    //       console.log('here');
    //       list.push(child.val());
    //     }

    //   });
    //   this.setState({render: true});
    // });
    
    // this.setState({data: list});

  }


  handleClick(event) {
    this.search(this.state.value);
  }



  search(db, child, query){

  }


  render() {
    if(!this.state.render)
      return <div>NOT READY</div>

    
    if(this.state.articles){
      var articleList = this.state.data.map((article) => {
        
        return <ArticleCard userId={article.userId} 
                    articleId={article.articleId} 
                    title={article.title} 
                    author={article.author} 
                    link={article.link} 
                    ratings={article.ratings} 
                    source={article.source} 
                    rating={article.rating} 
                    user={article.username} />
      });
    }

    return (
      <div>{articleList}</div>
    );
  }
}
