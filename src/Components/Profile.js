import React from 'react';
import Review from './Review';
import firebase from 'firebase';
import { LinkContainer } from 'react-router-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';


export default class ProfileControl extends React.Component {
  constructor(){
    super();
    this.state = {
      render: false,
      userId: '',
      reviews: null,
      stats: {
        totalReviews: 0,
        totalSubmissions: 0,
        averageContent: 0.0,
        averageAuthor: 0.0,
        averageSource: 0.0
      }
    }

    this.componentDidMount = this.componentDidMount.bind(this);

    //this.getReviews = this.getReviews.bind(this);
    //console.log(this.props.params.username);
  }

  componentDidMount(){
    
    var ref = firebase.database().ref();
    var x = this;
    // get the ref of the user page param you are at
    ref.child('/users/' + this.props.params.userId).once('value', (snapshot) => {
      // iterate the reviews index and store the reviews in state
      var reviewsArr = [];
      var userReviewRef = snapshot.child('reviews');
      if(userReviewRef){
        userReviewRef.forEach((child) => {
          // get from the review firebase
          var reviewRef = ref.child('/reviews/' + child.key + '/' + this.props.params.userId).once('value', (snap) => {
            reviewsArr.push(snap.val());
            this.setState({render: true});
          });
        });
      }

      this.setState({userId: snapshot.key,
                      reviews: reviewsArr,
                      handle: snapshot.val().handle
                    });
      
    });

    
    
  }

  render(){
    if(!this.state.render)
      return <div>not ready</div>;

    var reviewItems = this.state.reviews.map((review) => {

      return <Review key={review} authorRating={review.authorRating} 
              contentRating={review.contentRating} 
              sourceRating={review.sourceRating} 
              text={review.text}></Review>
    });

    return (

      <div>
        <Profile handle={this.state.handle}/>
        <TabWrapper reviews={reviewItems}/>
        
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
    var profile = <div>STATS HERE</div>
    var reviews = this.props.reviews;
    var submissions = <div>SUBMISSIONS HERE</div>
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Profile">{profile}</Tab>
        <Tab eventKey={2} title="Ratings">{reviews}</Tab>
        <Tab eventKey={3} title="Submissions">{submissions}</Tab>
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