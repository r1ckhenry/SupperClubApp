$(document).ready(function(){
  // eventListener on input
  $("#search-form").on("keyup", function(e){
    // e.preventDefault();
    getMenuResults();
  })
  // show cards on doc load
  getMenuResults();

  $('#searchresults').on("click", function(e){
     bookSupper();
  })
});

  function getMenuResults(){
    // sending search to db

    $.post('/searchresults', { location: $('.form-input').val() },
      function(response){
        console.log(response)
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
          var searchCard = '<div class="box box-2 supper-card animated slideInUp"><img class="search-img" src="'+element.image+'"/>';
              searchCard += '<div class="supper-card-content"><p class="lead">'+element.title+'</p>';
              searchCard += '<div class="home-card-date"><small>'+element.date+'"</small></div>';
              searchCard += '<p class="small-alert-header">Menu:</p><p class="small">'+element.menu[0].dishes[0]+'</p><hr>'
              searchCard += '<div class="btn-card"><a class="btn btn-prim small" href="/suppers/'+supperId+'">More Info</a></div></div></div>';
          $('#searchresults').append(searchCard);
        })
      })
    }




   





