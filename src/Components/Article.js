import React from 'react';
//import PostController from './PostController';
import {Col, Form, FormControl, InputGroup, Button, Glyphicon, Image} from 'react-bootstrap';
import firebase from 'firebase';



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
            <div>
              <SearchForm />
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

  render() {
    return (
      <div >
        <Col xs={2}>
        <h3>{this.props.title}</h3>
        <h5>{this.props.author}</h5>
        <h5>{this.props.source}</h5>
        </Col>
          <div >
            <p></p>
          </div>
      </div>
    );
  }

}

class SearchForm extends React.Component {
    handleChange(event) {
    var newValue = event.target.value;
    newValue = newValue.toLowerCase();
    var searchTerm = newValue;
    this.setState({ searchValue: searchTerm });
    console.log(newValue);
  }

  handleClick(event) {
    event.preventDefault();
    console.log('click!');
  }
  
  render() {
    return (
      <Form inline className="search">
        <InputGroup>
          <InputGroup.Button>
            <Button onClick={this.props.searchClick}>
              <Glyphicon glyph="search" aria-label="Search"/>
            </Button>
          </InputGroup.Button>
          <FormControl type="text" placeholder="Search articles..." onChange = {this.props.handleChange}/>
        </InputGroup>
      </Form>
    );
  }
}
export default ArticleList;