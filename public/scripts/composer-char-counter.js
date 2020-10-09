$(() => {
  // character counter function
  // textarea input on listening
  // add class .red to the output element when over the limit or remove .red vice versa
  $('#tweet-text').on('input', function() {
    const $output = $(this).siblings('div').children('output');
    const $input = $(this).val();
    $output[0].innerText = 140 - $input.length;
    $output[0].innerText < 0 ? $output.addClass('red') : $output.removeClass('red');
  });


});