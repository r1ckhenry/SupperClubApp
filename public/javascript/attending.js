


$(document).ready(function(){
  var pathname = window.location.pathname;
  $('.attending').on('click', function(e){
    e.preventDefault();
    $('#notify').append("You're going to this supper!");
    
    $.get(pathname, function(response){
      console.log(response);
    })
  });

});