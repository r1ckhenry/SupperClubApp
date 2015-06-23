var EditProfile = EditProfile || {}

$(function(){

  $.get('/assets/cuisines.json', function(response) {
    var foods = response.food;
    foods.forEach(function(e, i){
      $('#showCuisines').append('<option value="'+e+'">'+e+'</option>')
    });
  });



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