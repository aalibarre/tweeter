$(document).ready(function() {
    // --- our code goes here ---

    $("#tweet-text").on('keyup', function() {
     let counting = $(this).val().length 
     let stopCount = 140
     let remainingChar = stopCount - counting
     console.log(remainingChar);
      $(".counter").text(remainingChar);
      if(remainingChar < 0) {
        $(".counter").css("color", "red")
      } else {
        $(".counter").css("color", "black")
      }
    });

  
  });

