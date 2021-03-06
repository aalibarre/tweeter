/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const renderTweets = function (tweets) {
    let $borderTweets = $(".borderTweets");
    // loops through tweets
    $borderTweets.empty();
    const newTweet = tweets.sort((a, b) => {
      return b.created_at - a.created_at;
    });
    $.each(newTweet, (x) => {
      const $tweetsX = createTweetElement(tweets[x]);

      //console.log("tweestX", tweets[x]);
      //console.log("tweestX", $tweetsX);
      $borderTweets.append($tweetsX);
    });
    // takes return value and appends it to the tweets container
    //console.log($borderTweets);
    return $borderTweets;
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    const safeHTML = `${escape(tweet.content.text)}`;
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
        ${safeHTML}
        </section>
        <footer class="bottom-of-border">
        <section>${timeago.format(tweet.created_at)}</section>
        <section>
        <i class="hoverIcon fa-solid fa-flag"></i>
        <i class="hoverIcon fa-solid fa-retweet"></i>
        <i class="hoverIcon fa-solid fa-heart"></i>
        </section>
        </footer>
        </div>
        `);
    return $tweet;
  };
  $(".too-long").hide();
  $(".too-short").hide();

  $("form").on("submit", function (evt) {
    evt.preventDefault();
    const val = $(this).serialize();
    console.log(val);
    if (val === "text=") {
      $(".too-short").slideDown();
    } else if (val.length > 140) {
      $(".too-long").slideDown();
    } else {
      $.post("/tweets", val)
        .then((result) => {
          $(".too-long").hide();
          $(".too-short").hide();
          console.log("result", result);
          $("#tweet-text").val("");
          loadTweets();
        })
        .catch((err) => {
          console.log("ajax error caught");
          console.log(err); // related error
        });
    }
  });

  const loadTweets = function () {
    $.get("/tweets")
      .then((result) => {
        console.log("result", result);
        renderTweets(result);
      })
      .catch((err) => {
        console.log("ajax error caught");
        console.log(err); // related error
      });
  };
  loadTweets();
});
