import React from 'react';

//Component for the about page
class About extends React.Component {
    render () {
        return (
            <div className='container'>
                <h1 role= 'banner' className='about-title'>Welcome to TruthFeed!</h1>
                <div role= 'region' className='about-text animated fadeIn'>
                    <p>In light of the recent presidential election, an increased amount of light has been 
                    shone on the power that misinforming and false news articles can have on the perceptions of 
                    individuals. Recent studies have shone that an increasing number of Americans are exposed to high 
                    amounts of blatantly false or hyperpartisan news articles via social media. At TruthFeed, our goal is to provide a way for our users to evaluate the 
                    validity of news content in order to combat this widespread issue. Our hope is that through user activity and support, TruthFeed can be 
                    a reliable resource for determining the validity of the news that we are exposed to everyday.</p>
                </div>
                <h2 className='animated fadeIn'>How it works</h2>
                <div role= 'region'className='about-text animated fadeIn'>
                    <p>TruthFeed gives users the opportunity to review the validity of news articles posted by other TruthFeed 
                    users. When submitting new articles, users include information about the title, author(s), and source of the piece as 
                    well as a hyperlink to the article. Once the article is submitted, it will appear on TruthFeed and can then be 
                    validated! Users can rate the validity of the author, source, and content of the article. The scores from the individual review 
                    are then used along with the other reviews on the same article to calculate the overal validity rating for that article. When leaving 
                    reviews, users are also encouraged to explain their reasoning via a comment box.</p>
                </div>
                <div role= 'contentinfo' className='footer'>
                    <p>Made with love by Team Firebaes</p>
                </div>
            </div>
        );
    }
}
export default About;