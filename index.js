import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetInput = document.getElementById('tweet-input')
tweetInput.value = '' // this is to clear the input field

// listens for clicks on the page
document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.id === "reply-btn"){
        handleReplyBtnClick(e.target.dataset.newReply) // this gets the id of the tweet I am replying to
    }
    else if(e.target.id === "load-more-btn"){
        handleLoadMoreBtn()
    }
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden') 
}

function handleTweetBtnClick(){

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@You546`,
            profilePic: `images/You.webp`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    tweetInput.value = ''
    }
}

/* This is the function that handles the reply coments */
function handleReplyBtnClick(replyId){
    const replyInput = document.getElementById("reply-input")

    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === replyId
    })[0]

    if(replyInput.value){
        targetTweetObj.replies.push({
            handle: "@You546",
            profilePic: "images/You.webp",
            tweetText: replyInput.value,
        })
    }

    render()
    replyInput.value = ''
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')

    console.log(targetTweetObj.replies)
}

function handleLoadMoreBtn(){
    render()
    document.getElementById('feed').innerHTML += `
        <div class="tweets-alert" id="tweets-alert">
            Tweet something new! 👆</br>
            You have seen all the Tweets on your feed.</div>
    `
    document.getElementById("tweets-alert").style.display = "block"
    setTimeout(function(){
        document.getElementById("tweets-alert").style.opacity = "1"
    }, 50)
}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = ''

        let newComment = `
        <div class="reply-input-area tweet-reply">
            <img src="images/You.webp" class="profile-pic" alt="user's profile picture">
            <textarea placeholder="Your reply here..." id="reply-input"></textarea>
        </div>
        <div class="reply-button-div">
            <button 
                class="tweet-btn reply-btn" 
                data-new-reply="${tweet.uuid}" 
                id="reply-btn">
                Reply
            </button>
        </div>
        `
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                            </div>
                    </div>
                `
            })
            repliesHtml += newComment
        } else {
            repliesHtml += newComment
        }
        
          
        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"
                                ></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}"
                                data-like="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${repliesHtml}
                </div>   
            </div>
        `
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml() + 
        `
        <div class="load-more-div">
            <div class="tweets-alert" id="tweets-alert">
                Tweet something new! 👆</br>
                You have seen all the Tweets on your feed.</div>
            <button class="load-more" id="load-more-btn">Load more</button>
        </div>`
}

render()

/* ============ dark mode ============ */
let darkMode = localStorage.getItem("darkMode")

const darkModeToggle = document.querySelector("#dark-mode-toggle")

const lightModeIcon = document.getElementById("light-mode-icon")
const darkModeIcon = document.getElementById("dark-mode-icon")

const enableDarkMode = () => {
    document.body.classList.add("darkmode")
    localStorage.setItem("darkMode", "enabled")
    darkModeIcon.classList.add("hidden")
    lightModeIcon.classList.remove("hidden")
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem("darkMode", null)
    lightModeIcon.classList.add("hidden")
    darkModeIcon.classList.remove("hidden")
}

if (darkMode === "enabled") {
    enableDarkMode()
} else {
    disableDarkMode()
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode")
    if (darkMode !== "enabled") {
        enableDarkMode()
    } else {
        disableDarkMode()
    }
})
