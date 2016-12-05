import React from 'react';
import firebase from 'firebase';
import { LinkContainer } from 'react-router-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';


export default class ProfileControl extends React.Component {
  constructor(){
    super();
    this.state = {
      userId: '',
      reviews: null,
    }
    //console.log(this.props.params.username);
  }

  componentDidMount(){
    
    var ref = firebase.database().ref();
    
    // get the ref of the user page param you are at
    ref.child('/users/' + this.props.params.userId).once('value', (snapshot) => {
      // iterate the reviews index and store the reviews in state
      var reviews = [];
      var userReviewRef = snapshot.child('reviews');
      if(userReviewRef){

        userReviewRef.forEach((child) => {
          // get from the review firebase
          var reviewRef = ref.child('/reviews/' + child.key + '/' + this.props.params.userId).once('value', (snap) => {
            reviews.push(snap.val());
          });
        });
      }
      this.setState({userId: snapshot.key,
                      reviews: reviews,
                      handle: snapshot.val().handle
                    });
      
    });
  }

  render(){
    //console.log(this.props.params.userId);
    //console.log(this.state.handle);
    return (
      <div>
        <Profile handle={this.state.handle}/>
        <TabWrapper />
      </div>
      
    )
    
  }
}

class TabWrapper extends React.Component {
  constructor(){
    super();
    this.state = {
      key: 1
    }

    this.handleSelect = this.handleSelect.bind(this);
  }
  

  handleSelect(key) {
    this.setState({key})
  }

  render(){
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Profile">Tab 1 content</Tab>
        <Tab eventKey={2} title="Ratings">Tab 2 content</Tab>
        <Tab eventKey={3} title="Submissions">Tab 3 content</Tab>
      </Tabs>
    );
  }
}


function Profile(props) {
  return(
    <div>
      {props.handle}
    </div>
  )
}