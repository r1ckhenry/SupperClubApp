var EditProfile = EditProfile || {};
var CuisineSearch = CuisineSearch || {};
var userBoard = userBoard || {};

$(function(){

  $.get('/assets/cuisines.json', function(response) {
    var foods = response.food;
    foods.forEach(function(e, i){
      $('#showCuisines').append('<option value="'+e+'">'+e+'</option>')
    });
  });

  $('#cuisineSearchInput').on('keyup', CuisineSearch.showSearch);
  $('#showCuisinesList').on('click', '.cuisine-type-js', userBoard.appendToBoard)

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

userBoard = {
  appendToBoard: function() {
    var $thisCountry = $(this).text();
    $('#faveCuisineBoard').append('<li>'+$thisCountry+'</li>');
    // console.log($this.text());
    userBoard.sendToDb($thisCountry)
  },
  sendToDb: function(country) {
    $.post('/profile', { newCountry : country})
      .done(function(response){
        console.log(response);
      })
  }
}




