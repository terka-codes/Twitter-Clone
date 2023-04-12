# Twittr Clone
This code is a front-end implementation of a Twitter clone project. It does basic twitter interations, at alowing to tweet, comment, like, retweet and alows user to chose light or dark mode, which is set to local storage.

## Take a look at the project

👉 [LIVE SITE HERE](https://singular-mousse-2a5a93.netlify.app/) 👈


https://user-images.githubusercontent.com/107133029/231433588-6d69ea5c-a3cc-4aa2-927d-0dff9a830293.mov


## The code is written in JavaScript, and it uses the following libraries and tools:

- uuid: a library for generating unique IDs
- Font Awesome: a library of icons
- CSS: for styling the HTML elements

## The code listens for clicks on different buttons and links within the page and performs different actions depending on the clicked element:

- If a "like" button is clicked, it calls the handleLikeClick function to toggle the "like" state of the tweet.
- If a "retweet" button is clicked, it calls the handleRetweetClick function to toggle the "retweet" state of the tweet.
- If a "reply" button is clicked, it calls the handleReplyClick function to show/hide the replies to the tweet.
- If the "Tweet" button is clicked, it calls the handleTweetBtnClick function to add a new tweet to the list of tweets.
- If the "Reply" button is clicked, it calls the handleReplyBtnClick function to add a new reply to a tweet.
- If the "Load More" button is clicked, it calls the handleLoadMoreBtn function to display a message indicating that all tweets have been loaded.
- The code generates the HTML code for the tweets using the getFeedHtml function, which iterates over the list of tweets and generates the HTML code for each tweet.
