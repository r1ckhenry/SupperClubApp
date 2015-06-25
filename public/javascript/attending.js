


$(document).ready(function(){
  var pathname = window.location.pathname;
  $('.attending').on('click', function(e){
    e.preventDefault();
    $('.booking-content').empty()
    $('#notify').append("You're going to this supper!");
    
    $.get(pathname, function(response){
      console.log(response);
    })
  });

});