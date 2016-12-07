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

  componentDidMount(){
    console.log(this.props.location.query)
    var db;
    var child;
    // if 
    if(this.props.location.query.articles){
      db = 'articles';
      child = 'title';
      this.setState({articles: true})
    }
    else {
      db = 'users';
      child = 'handle';
      this.setState({users: true})
    }

    var query = this.props.location.query[db].toString();
    var child1 = child;
    var ref = firebase.database().ref(db);
    var list = [];
    var test = ref.orderByChild(child).once("value", (snapshot) =>{
      snapshot.forEach((child)=> {
        console.log(child.val())
        console.log(query)
        if(_.includes(child.val()[child1], [query])){
          list.push(child.val());
        }

      })
      this.setState({render: true});
    });

    this.setState({data: list});

  }


  handleClick(event) {
    this.search(this.state.value);
  }



  search(db, child, query){

  }

  

  handleSelect(event){
    console.log(event.target)
  }

  render() {
    console.log(this.state);
    if(!this.state.render)
      return <div>NOT READY</div>

    
    if(this.state.articles){
      var articleList = this.state.data.map((article) => {
        
        return <ArticleCard userId={article.userId} 
                    articleId={23453} 
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
