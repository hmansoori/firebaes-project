import React from 'react';
import PostController from './PostController';
import {Form, FormControl, InputGroup, Button, Glyphicon, Image} from 'react-bootstrap';


class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = { articles: [] };
    

  }

  render() {
    return (
      <div className ="background">
        <div className= "container" >
          <header role="banner">
            <h1>Articles </h1>
          </header>
          <main role="main">
            <div>
                <ArticleList />
            </div>
            <footer role="contentinfo">
            </footer>
          </main>
        </div>
      </div>
    );
  }
}



 
class ArticleList extends React.Component {
  render() {
   

    return (
      <div>
        <h3></h3>
        <div>
        </div>
      </div>
    );
  }

}


class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <div >
        <h3></h3>
          <div >
            <p></p>
          </div>
      </div>
    );
  }

}