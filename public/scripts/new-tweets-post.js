// create a new tweet <article> HTML structure
const createTweetElement = function(tweetData) {

  // destructuring object by matching the databse format
  const {
    user: { name, avatars, handle },
    content: { text },
    created_at

  } = tweetData;


  const article = `<article>
<div class="article-content">
    <header>
        <div>
            <img src="${avatars}" alt="avatar">
            <span>${name}</span>
        </div>
        <i>${handle}</i>
    </header>
    <p>${escaping(text)}</p>
    <footer>
        <span>${converTime(created_at)}</span>
        <div><a></a><a></a><a></a></div>
    </footer>
</div>
</article>`;


  return article;

};




// Preventing XSS with Escaping by escape function
const escaping = function(text) {

  const DOMElem = document.createElement('div');
  DOMElem.innerText = text;
  return DOMElem.innerHTML;
};



// taking in an array of tweet objects and then appending each one to the #tweets-container
const renderTweets = function(data) {

  data.forEach(tweet => {
    const $tweet = $(createTweetElement(tweet)).mouseenter(toggleHover).mouseleave(toggleHover);
    $('#tweet-post').prepend($tweet);
  });

};



// tweet article hover shadow
const toggleHover = function() {
  $(this).toggleClass('box-hover').find(`p, span`).toggleClass('text-hover');
  $(this).find('i').toggle();
};



// tweet submit function
const tweetSubmit = function(tweet) {

  const $tweetSection = $('#tweet-post');
  //clear the textarea and return the counting as 140 chars left
  $('#tweet-text').val('').siblings('div').children('output').text('140');
  //adding mouseenter/mouseleave event to each post so that the hover can be triggered
  const $articleEle = $(createTweetElement(tweet)).mouseenter(toggleHover).mouseleave(toggleHover);
  //new tweet post whith a slidedown animation
  $tweetSection.prepend($articleEle.hide().delay(200).slideDown(1000));

};


// warning based on the tweet content
const warning = function(input) {
  const emptyStr = 'Tweet is empty. Plz tweet some content at least. #kthxbye.';
  const overLimits = 'Too long. Plz rspct our arbitrary limit of 140 chars. #kthxbye.';
  const alert = input ? overLimits : emptyStr;
  $('.err-message').text(alert).stop().slideDown(500);
};




// time shows as elapsed interval(arg time as in time tweet created at)
const converTime = function(time) {

  const format = [
    [60, 'minute'],
    [60, 'hour'],
    [24, 'day'],
    [30, 'month'],
    [12, 'year']
  ];

  // interval as in seconds
  const interval = (Date.now() - time) / 1000;
  let init = [interval, 'second'];
  let str;

  // for ... of to confirm the time unit and value ---- if current unit converting to next unit renders value less
  // than 1, it returns with an appropriate unit and value
  for (const elem of format) {
    if (init[0] / elem[0] < 1) {
      init[0] = Math.floor(init[0]);
      str = init[0] < 2 ? init.join(' ') + ' ago' : init.join(' ') + 's ago';
      // if returned value is second, text should show 'just now'
      return init[1] === 'second' ? 'Just now' : str;
    }
    init[0] /= elem[0];
    init[1] = elem[1];
  }
  // only value over a year could be returned if the loop finished
  init[0] = Math.floor(init[0]);
  return init[0] < 2 ? init.join(' ') + ' ago' : init.join(' ') + 's' + ' ago';
};