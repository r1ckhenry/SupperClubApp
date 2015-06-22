var Supper = Supper|| {}

$(document).ready(function(){
  Supper.all
  
});

supper = {
  all: function(){
    $('#form-submit').on('submit', function(e){
      e.preventDefault();
      console.log('working')
      Supper.create($(this).serialize())
      // console.log('working')
    });
    }
  }
