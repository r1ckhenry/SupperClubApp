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
    // console.log(this)
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


        // console.log(response);
        // if(response === item)
      }

  )}

    function appendToPage(){
      $.get('/searchresults', function(index, item){
        var result = item
        console.log(this);

      })
    }


// function getSearchResults() {
 
//   $.post('/searchresults', { location: $('.form-input').val() }, function(response){
//     console.log(response);
//     $.each($(response), function(index, item){

//       console.log(item.address[0].city);
//     })


    // var location = JSON.parse(data);
   
    // $.each(location, function(index, location){
      // console.log(this);
    // })
    // /data.create($(this).serialize())
    // $(data).find('.form-input')
   // console.log(data);

  // }).done(function(response){
  //   console.log(response);
//   })

// }





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