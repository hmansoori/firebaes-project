import React from 'react';
import Reviews from './Reviews';
import { ArticleCard } from './Article';
import firebase from 'firebase';
import { LinkContainer } from 'react-router-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';

export default class ProfileControl extends React.Component {
  constructor(){
    super();
    this.state = {
      reviewRender: false,
      articleRender: false,
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
  }

  componentDidMount(){
    
    var ref = firebase.database().ref();
    // get the ref of the user page param you are at
    ref.child('/users/' + this.props.params.userId).once('value', (snapshot) => {
      // iterate the reviews index and store the reviews in state
      var reviewsArr = [];
      var userReviewRef = snapshot.child('reviews');
      if(userReviewRef.val()){
        userReviewRef.forEach((child) => {
          // get from the review firebase
          var reviewRef = ref.child('/reviews/' + child.key + '/' + this.props.params.userId).once('value', (snap) => {
            
            reviewsArr.push(snap.val());
            this.setState({reviewRender: true});

          });
        });
      }
      else{
        this.setState({reviewRender: true});
      }

      var articlesArr = [];
      var userArticleRef = snapshot.child('articles');
      if(userArticleRef.val()){
        
        userArticleRef.forEach((child) => {
          
          var articleRef = ref.child('/articles/' + child.key ).once('value', (snap) => {
            
            var article = 
            { 
              userId : snap.val().userId,
              link: snap.val().link,
              author: snap.val().author,
              articleId: snap.key,
              rating: snap.val().rating,
              source: snap.val().source,
              title: snap.val().title,
              user: snap.val().username
            }
            articlesArr.push(article);
            this.setState({articleRender: true});
          });
        });
      }
      else {
        this.setState({articleRender: true});
      }
      this.setState({userId: snapshot.key,
                      reviews: reviewsArr,
                      articles: articlesArr,
                      handle: snapshot.val().handle
                    });
      
    });
  }

  render(){
    if(!this.state.reviewRender && !this.state.articleRender)
      return <div>not ready</div>;
    
      var authorRating = 0;
      var sourceRating = 0;
      var contentRating = 0;
      var fullRating = 0;
    if(this.state.reviews){
      var reviewList = this.state.reviews.map((review) => {
        authorRating += review.authorRating;
        sourceRating += review.sourceRating;
        contentRating += review.contentRating;

      return <Reviews review={review}
          key={review.key}
          user={review.userId} />
    });

      authorRating = ((authorRating / (this.state.reviews.length)) * 100);
      sourceRating = ((sourceRating / (this.state.reviews.length)) * 100);
      contentRating = (contentRating / (this.state.reviews.length)) * 100;
      fullRating = ((authorRating + sourceRating + contentRating) / 3).toFixed(2);
      authorRating = authorRating.toFixed(2);
      sourceRating = sourceRating.toFixed(2);
      contentRating = contentRating.toFixed(2);
    }
    
    if(this.state.articles){
      var articleList = this.state.articles.map((article) => {
       
        return <ArticleCard userId={article.userId} 
                    articleId={article.articleId} 
                    title={article.title} 
                    author={article.author} 
                    link={article.link} 
                    ratings={article.ratings} 
                    source={article.source} 
                    rating={article.rating} 
                    user={article.user} />
      });
    }
      
    return (

      <div className="container">
        <Profile handle={this.state.handle}/>
        <TabWrapper reviews={reviewList} submissions={articleList} authorRating={authorRating} sourceRating={sourceRating} contentRating={contentRating}/>
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
    var profile = <div className='profile-details animated fadeIn'><ul className='profile-list'>
                    <li className='profile-item'>Average author rating: {this.props.authorRating} </li>
                    <li className='profile-item'>Average source rating: {this.props.sourceRating} </li>
                    <li className='profile-item'>Average content rating: {this.props.contentRating} </li>
                  </ul></div>
    var submissions = <div></div>
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Profile">{profile}</Tab>
        <Tab eventKey={2} title="Ratings">{this.props.reviews}</Tab>
        <Tab eventKey={3} title="Submissions">{this.props.submissions}</Tab>
      </Tabs>
    );
  }
}

function Profile(props) {
  return(
    <div className='user-name'>
      User: {props.handle}
    </div>
  )
}