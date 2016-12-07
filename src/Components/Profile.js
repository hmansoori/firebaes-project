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
    // get the ref of the user page param you are at
    ref.child('/users/' + this.props.params.userId).once('value', (snapshot) => {
      // iterate the reviews index and store the reviews in state
      var reviewsArr = [];
      var userReviewRef = snapshot.child('reviews');
      if(userReviewRef){
        userReviewRef.forEach((child) => {
          // get from the review firebase
          var reviewRef = ref.child('/reviews/' + child.key + '/' + this.props.params.userId).once('value', (snap) => {
            console.log(snap.key);
            

            reviewsArr.push(snap.val());
            //console.log(reviewsArr);

          });
        });
      }

      var articlesArr = [];
      var userArticleRef = snapshot.child('articles');
      if(userArticleRef){
        userArticleRef.forEach((child) => {
          //console.log(child.key)
          var articleRef = ref.child('/articles/' + child.key ).once('value', (snap) => {
            var article = 
            { 
              userId : snap.val().userId,
              link: snap.val().link,
              author: snap.val().author,
              articleId: snap.key,
              rating: snap.val().rating,
              source: snap.val().source,
              title: snap.val().title
            }
            articlesArr.push(article);
            this.setState({render: true});
          });
        });
        
      }

      
      //console.log(reviewsArr);
      this.setState({userId: snapshot.key,
                      reviews: reviewsArr,
                      articles: articlesArr,
                      handle: snapshot.val().handle
                    });
      
      
    });

    
    
  }

  render(){
    if(!this.state.render)
      return <div>not ready</div>;
    
      var authorRating = 0;
      var sourceRating = 0;
      var contentRating = 0;
      var fullRating = 0;

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
      /*
      <ArticleCard userId={article.userId} 
                    articleId={article.id} 
                    article={article} 
                    title={article.title} 
                    author={article.author} 
                    link={article.link} 
                    ratings={article.ratings} 
                    source={article.source} 
                    rating={article.rating} 
                    user={article.user} />
                  */
      var articleList = this.state.articles.map((article) => {
        console.log(article);
        return <ArticleCard userId={article.userId} 
                    articleId={article.articleId} 
                    title={article.title} 
                    author={article.author} 
                    link={article.link} 
                    ratings={article.ratings} 
                    source={article.source} 
                    rating={article.rating} 
                    user={article.userId} />
      });



      //firebase.database().ref('articles/' + this.props.params.articleId).update({ rating: fullRating });
    
    // var reviewItems = this.state.reviews.map((review) => {

    //   return <Review key={review} authorRating={review.authorRating} 
    //           contentRating={review.contentRating} 
    //           sourceRating={review.sourceRating} 
    //           text={review.text}></Review>
    // });

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
    var profile = <div>
                    Average author rating: {this.props.authorRating} <br/>
                    Average source rating: {this.props.sourceRating} <br/>
                    Average content rating: {this.props.contentRating} <br/>
                  </div>
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
    <div>
      {props.handle}
    </div>
  )
}