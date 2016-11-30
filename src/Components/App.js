import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SearchForm />
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
    console.log('click!');
  }
  
  render() {
    return (
      <Form inline>
        <InputGroup>
          <InputGroup.Button>
            <Button onClick={this.props.searchClick}>
              <Glyphicon glyph="search" aria-label="Search"/>
            </Button>
          </InputGroup.Button>
          <FormControl type="text" placeholder="Search..." onChange = {this.props.handleChange}/>
        </InputGroup>
      </Form>
    );
  }
}

export default App;
