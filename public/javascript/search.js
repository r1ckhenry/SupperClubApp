$(document).ready(function(){
// eventListener on input
  $("#search-form").on("keyup", function(e){
    e.preventDefault();
    getMenuResults();

  })
});

  function getMenuResults(){
    // sending search to db

    $.post('/searchresults', { location: $('.form-input').val() },
      function(response){
       var val = $('.form-input').val()
        $.each($(response), function(index, item){
         var location =  item.address[0].city
          location.includes(val)  === true ? 
          appendToPage(item._id): false;
        })
      }
  )}

    function appendToPage(supperId){
      // adding search to page

      $('#searchresults').empty();
      $.get('/suppers/' + supperId, function(response){
        $.each($(response), function(index,element) {
          console.log(element.user);
          // $('#searchresults').append('<h4>'+element.guest+'</h4>');
          $('#searchresults').append('<h4>'+element.title+'</h4>');
          $('#searchresults').append('<img src="'+element.image+'"/>');
        })
      })
    }




   





