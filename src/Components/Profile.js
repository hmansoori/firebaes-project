import React from 'react';
import firebase from 'firebase';


export default class ProfileControl extends React.Component {
  constructor(){
    super();
    this.state = {
      userId: '',
      reviews: null,
    }
  }

  componentDidMount(){
    var userRef = firebase.database().ref('/users/' + this.props.userId);
    userRef.on('value', (snapshot) => {
      var snapshotVal = snapshot.val();
      this.setState({userId: snapshotVal.key,
                      reviews: snapshotVal.reviews,
                      handle: snapshotVal.handle,
                      avatar: snapshotVal.avatar
                    });
    });
  }

  componentWillUnmount() {
    firebase.database().ref('/users/' + this.props.userId).off();
  }

  render(){
    console.log(this.state.handle);
    return (
      <Profile handle={this.state.handle}/>
    )
    
  }
}


function Profile(props) {
  return(
    <div>
      {this.props.handle}
    </div>
  )
}