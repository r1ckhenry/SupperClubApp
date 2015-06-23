// console.log('apple')
// var Supper = Supper|| {} 
 var supper = [];

$(document).ready(function(){

  $('#search-form').on("submit", function(e){
    e.preventDefault();
    console.log('working');
    getSearchResults();
  });
});

// Supper = {
// all: 


function getSearchResults() {
 
  $.post('/searchresults', { location: $('.form-input').val() }, function(response){
    $.each($(response), function(index, location){
      $('.searchresults').append(
        // '<h1>' + location.menu + '<h1>'
        location.menu[0].dishes

        )
      console.log(this);
    })


    // var location = JSON.parse(data);
   
    // $.each(location, function(index, location){
      // console.log(this);
    // })
    // /data.create($(this).serialize())
    // $(data).find('.form-input')
   // console.log(data);

  // }).done(function(response){
  //   console.log(response);
  })

}





// function(){
// console.log('popchips');
//     $('#search-form').on("submit", function(e){
//       e.preventDefault();
//        console.log(this)
//        var $form = $(this) 
//        location = $form.find(location).val()

// //       // var posting = $.post(url, {s: term})

// //       // posting.done(function(data){
// //       //   var content = $(data).find("#content");
// //       //   $("#result").empty().append(content);
// //       // })
// //       // Supper.create($(this).serialize())
// //       // debugger
// //       // console.log('working')
// //     });
// //     // }
//    });
//   }
// }