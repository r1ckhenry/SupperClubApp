var EditProfile = EditProfile || {};
var CuisineSearch = CuisineSearch || {};

$(function(){

  $.get('/assets/cuisines.json', function(response) {
    var foods = response.food;
    foods.forEach(function(e, i){
      $('#showCuisines').append('<option value="'+e+'">'+e+'</option>')
    });
  });

  $('#cuisineSearchInput').on('keyup', CuisineSearch.showSearch);

});

/// Code to be completed Thurs

EditProfile = {
  update: function() {
    $.ajax({
      type: 'PUT',
      url: '/profile',
      data: {
        name:  $('#editName').val(),
        email: $('#editEmail').val(),
        faveCuisines: $( "#showCuisines option:selected" ).text()
      },
      dataType: 'JSON'
    }).done(function(response){
      console.log(respnse)
    });
  }
}


// Search Show in in dropdown
CuisineSearch = {
  showSearch: function() {
    $('#showCuisinesList').empty();
    $.get('/assets/cuisines.json', function(response){
      CuisineSearch.showOptions(response);
    });
  },
  showOptions: function(response, val) {
    var val = $('#cuisineSearchInput').val();
    $.each($(response.food), function(i,e){
        var countries = e.includes(val) === true ? CuisineSearch.appendList(e) : false;
    })
  },
  appendList: function(country) {
    $('#showCuisinesList').append('<li class="cuisine-type-js">'+country+'</li>');
  }
}




