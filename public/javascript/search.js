$(document).ready(function(){
// eventListener on input
  $("#search-form").on("keyup", function(e){
    e.preventDefault();
    getMenuResults();

  })

  $('#searchresults').on("click", function(e){
     bookSupper();
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
          $('#searchresults').append('<h4>'+element.guest+'</h4>');
          $('#searchresults').append('<h4>'+element.title+'</h4>');
          $('#searchresults').append('<img src="'+element.image+'"/>');
          $('#searchresults').append('<a href="/suppers/'+supperId+'">ViewInfo</a>');
        })
      })
    }




   





