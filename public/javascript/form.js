$(document).ready(function(){
  // $('#supper-form').on('submit', function(e){
  //   console.log($('.checkbox').serialize());
  //   $.post('/suppers', $('.checkbox').serialize())
  //   .done(function(data){
  //     console.log(data);
  //   })
  // })

$(function(){
    var $select = $("#guestNumber");
    for (i=1;i<=10;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

});


