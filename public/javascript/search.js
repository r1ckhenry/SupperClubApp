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
          console.log(element)
          var searchCard = '<div class="box box-2 search-card"><img class="search-img" src="'+element.image+'"/>';
              searchCard += '<div class="card-info"><h4>'+element.title+'</h4>';
              searchCard += '<p>'+element.guest+'"</p>';
              searchCard += '<a class="btn btn-prim" href="/suppers/'+supperId+'">ViewInfo</a></div></div>';



          $('#searchresults').append(searchCard);
          // $('#searchresults').append('<h4>'+element.title+'</h4>');
          // $('#searchresults').append('<img src="'+element.image+'"/>');
          // $('#searchresults').append('<a href="/suppers/'+supperId+'">ViewInfo</a></div>');
        })
      })
    }




   





