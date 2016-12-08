import React, { Component } from 'react';
import update from 'immutability-helper';
import { ArticleCard } from './Article';
import firebase from 'firebase';
import { Link } from 'react-router';
var _ = require('lodash');


class UserItem extends React.Component {
  render(){
    return(
      <div>{this.props.handle}</div>
    )
  }
}

export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      data: [],
      render: false

    }

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
    else if(this.props.location.query.users) {
      db = 'users';
      child = 'handle';
      this.setState({users: true})
      var query = this.props.location.query.users.toString().toLowerCase();
      
      var child1 = child;
      var ref = firebase.database().ref('users');
      var list = [];
      ref.once("value", (snapshot) =>{
        snapshot.forEach((child)=> {
          if(_.includes(child.val().handle.toLowerCase(), [query])){
            var newOne = {
              handle: child.val().handle,
              userId: child.key
            }
            list.push(newOne);
          }

        });
        this.setState({render: true});
      });
      
      this.setState({data: list});

    }

  }


  handleClick(event) {
    this.search(this.state.value);
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

    if(this.state.users){
      var userList = this.state.data.map((user) => {
       
        return <Link to={'/user/' + user.userId}><UserItem handle={user.handle}/></Link>
      });
    }
    var render = this.state.articles ? <div className="container"><h2>Article Results</h2>{articleList}</div> : <div className='user-reviews animated fadeIn container'><h2>User Results</h2>{userList}</div>;
    return (
      <div>
              {render}
      </div>

    );
  }
}
