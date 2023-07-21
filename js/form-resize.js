// change textarea columns on resize
$(document).ready(function() {
  
 if($(window).width() <= 375) {
   $('.box').attr({
     "cols" : "28"
   });
 }
});

// change textarea columns on resize
$(window).resize(function() {

  if($(window).width() <= 375) {
    $('.box').attr({
      "cols" : "28"
    });
  }
});

// does not work for loading at <= 375 and resizing up
