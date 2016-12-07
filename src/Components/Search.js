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
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.search = this.search.bind(this);
    //this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    console.log(this.props.location.query)
    var db;
    var child;
    if(this.props.location.query.title){
      //console.log('title')
      db = 'articles';
      child = 'title';
      this.setState({articles: true})
    }
    else {
      db = 'users';
      child = 'username';
      this.setState({users: true})
    }

    //console.log(db);
    var query = this.props.location.query[child].toString();
    var ref = firebase.database().ref(db);
    var list = [];

    var test = ref.orderByChild(child).on("value", (snapshot) =>{
      snapshot.forEach((child)=> {

        if(_.includes(child.val().title, [query])){
          list.push(child.val());
        }

      })
      this.setState({render: true});
    });
    
    // var newState = update(this.state, { data: {
    //   $push : [list]
    // }
    // });
    this.setState({data: list});

  }

  // componentWillUpdate(){
  //   this.componentWillMount();
  // }

  componentWillUnmount(){
    firebase.database.ref('articles').off();
  }


  handleClick(event) {
    this.search(this.state.value);
  }



  search(query){
    var articles = _.cloneDeep(this.state.articles);
    var searchList = [];
    var index = 0;
    articles.forEach((child) => {
      if( _.includes(child.title, query))
        searchList.push(articles[index]);

      index +=1;
    });

  }

  

  handleSelect(event){
    console.log(event.target)
  }

  render() {
    if(!this.state.render)
      return <div>NOT READY</div>

    console.log(this.state);
    if(this.state.articles){
      var articleList = this.state.data.map((article) => {
        console.log(article);
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
