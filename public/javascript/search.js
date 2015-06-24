// console.log('apple')
// var Supper = Supper|| {} 
 var supper = [];

$(document).ready(function(){

  // $('#search-form').on("submit", function(e){
  //   e.preventDefault();
  //   console.log('working');
  //   getSearchResults();
  // });

  $("#search-form").on("keyup", function(e){
    e.preventDefault();
    
    getMenuResults();
  })
});



  function getMenuResults(){

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
      $.get('/suppers/' + supperId, function(response){
        $('#searchresults').empty();
        $.each($(response), function(index,element) {
          // $('#searchresults').append('<h4>'+element.guest+'</h4>');
          $('#searchresults').append('<h4>'+element.description+'</h4>');
          

        })
      })
    }


// function getSearchResults() {
 
//   $.post('/searchresults', { location: $('.form-input').val() }, function(response){
//     console.log(response);
//     $.each($(response), function(index, item){

//       console.log(item.address[0].city);
//     })


   





