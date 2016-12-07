import React from 'react';


class About extends React.Component {
    render () {
        return (
            <div className='container'>
                <h1 className='about-title'>Welcome to TruthFeed!</h1>
                <div className='about-text'>
                    <p>In light of the recent presidential election, an increased amount of light has been 
                    shone on the power that misinforming and false news articles can have on the perceptions of 
                    individuals. Recent studies have shone that an increasing number of Americans are exposed to high 
                    amounts of blatantly false or hyperpartisan news articles via social media. At TruthFeed, our goal is to provide a way for our users to evaluate the 
                    validity of news content in order to combat this widespread issue. We hope that through user </p>
                </div>
                <h2>How it works</h2>
                <p>TruthFeeder gives users the opportunity to review the validity of news articles posted by other TruthFeeder 
                users. When submitting new articles, users include information about the title, author(s), and source of the piece as 
                well as a link to the article.</p>
            </div>
        );
    }
}
export default About;