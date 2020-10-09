/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  DOMContentLoaded
$(() => {


  // navbar arrows animation --- arrow will move up/down with a duration of 1s
  const arrowAnimate = () => {
    $("#arrow").animate({ top: '100%' }, 1000);
    $("#arrow").animate({ top: '75%' }, 1000);
  };

  // set interval to make arrow keep move every 2s with 100ms delay
  const arrowMove = setInterval(arrowAnimate, 2100);



  // make a request to /tweets and receive the array of tweets as JSON
  const loadTweets = function() {
    $.ajax({
      url: 'tweets',
      method: 'GET'
    })
      .then((data) => {
        renderTweets(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //getting initial tweet data while refreshing page
  loadTweets();


  // make request to POST tweets then getting response from server
  const postTweets = function(form) {
    $.ajax({
      url: 'tweets',
      type: 'POST',
      data: form.serialize()
    })
      .then((res) => {
        tweetSubmit(res);
      });
  };


  // event listener to handle form submission
  $('.new-tweet form').submit(function(e) {
    e.preventDefault();
    const form = $(this);
    const input = form.children('#tweet-text').val();
    // check if the input is empty or over 140 char
    input && input.length <= 140 ? postTweets(form) : warning(input);
  });



  // error message will hide while textarea is on focus
  $('#tweet-text').focus(function() {
    $(this).parent().siblings('.err-message').stop().slideUp(500);
  });



  // toggle the new tweet area
  $('nav span:eq(1)').click(() => {
    const tweetArea = $('.new-tweet');
    const textArea = $('#tweet-text');
    tweetArea.stop().slideToggle(1000, function() {
      textArea.is(':focus') ? textArea.blur() : textArea.focus();
    });
  });


  // scroll event triggering Toggle Button and top button to show/hide
  $(window).scroll(function() {
    const navHeight = $('nav').outerHeight();
    const bottomNav = $('.bottom-nav');
    const topNav = $('nav span:eq(1)');
    if ($(this).scrollTop() > navHeight) {
      // clearing arrow-move once top button disappears
      clearInterval(arrowMove);
      topNav.stop().hide();
      bottomNav.stop().addClass('ani-pop');
    } else {
      topNav.stop().fadeIn(200);
      // starting arrow-move if top button appears
      const arrowMove = setInterval(arrowAnimate, 2100);
      bottomNav.stop().removeClass('ani-pop');
    }
  });



  //scroll to top of page by clicking bottom button
  $('.bottom-nav').click(function() {
    $('html').animate({ scrollTop: 0 }, 800, () => {
      $('#tweet-text').focus();
    });
  });


});