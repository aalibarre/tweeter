/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {



const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    }, 
    {
        "user": {
          "name": "Descartes",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      }
    ]

    const renderTweets = function(tweets) {
       let $borderTweets = $(".borderTweets")
        // loops through tweets
        $.each(tweets, (x) => {
            const $tweetsX = createTweetElement(tweets[x])

            console.log("tweestX", tweets[x]);
            console.log("tweestX", $tweetsX);
            $borderTweets.append($tweetsX)
        })
        // takes return value and appends it to the tweets container
        console.log($borderTweets);
        return $borderTweets;
      }

    
      const createTweetElement = function(tweet) {
        let $tweet = $(`
        <div class="tweet-container">
            <header class="avatar-box">
                <section class="head-of-tweet">
                    <img class="tiny-avatar" src=${tweet.user.avatars} />
                    <p>${tweet.user.name}</p>
                </section>
                <section class="at-of-avatar">${tweet.user.handle}</section>
            </header>
        <section class="actual-tweet">
        ${tweet.content.text}
        </section>
        <footer class="bottom-of-border">
        <section>${tweet.created_at}</section>
        <section>
        <i class="hoverIcon fa-solid fa-flag"></i>
        <i class="hoverIcon fa-solid fa-retweet"></i>
        <i class="hoverIcon fa-solid fa-heart"></i>
        </section>
        </footer>
        </div>
        `)
       
        return $tweet;
      }
      
      renderTweets(data);
    })
      