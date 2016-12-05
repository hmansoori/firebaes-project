import React from 'react';
import firebase from 'firebase';

import { Nav, NavItem } from 'react-bootstrap';


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
      <Profile handle={this.state.handle}/>
    )
    
  }
}


function Profile(props) {
  return(
    <div>
      {props.handle}
      <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
        
      </Nav>
    </div>
  )
}