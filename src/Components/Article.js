import React from 'react';
//import PostController from './PostController';
import {Form, FormControl, InputGroup, Button, Glyphicon, Image} from 'react-bootstrap';



class ArticleControl extends React.Component {
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
              <SearchForm />
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
        <h3>Artists</h3>
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
        <h3>{this.props.artist.name}</h3>
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
export default ArticleControl;