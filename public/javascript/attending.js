


$(document).ready(function(){
  var pathname = window.location.pathname;
  $('.attending').on('click', function(e){
    // e.preventDefault();
    $('.booking-content').empty()
    $('.booking-content').append("Yeah! Off too dinner you go");
    
    $.get(pathname, function(response){
      console.log(response);
    })
  });

});