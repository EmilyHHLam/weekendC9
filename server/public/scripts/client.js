$(document).ready(function(){
console.log('jQuery sourced');

//showing the task list
getTask();

$('.addingTask').on('click', '#ticketSubmited', function() {
  console.log('ticketid ' + $('#ticketid').val());
  console.log('ticketdetail ' + $('#ticket_detail').val());

  //add aJax
  $.ajax( {
    type: 'POST',
    url: '/task/addtask',
    data: {id: $('#ticketid').val(), detail:  $('#ticket_detail').val() },
    success: function(response) {
        // Refresh our data
        getTask();
      }//end success function


    });//end of ajax
  }); //end of click addingTask
});//end document.ready

function getTask() {
  $.ajax({
    type: "GET",
    url: "/task",
    success: function(response) {
      console.log(response);
      $('#taskinfo').empty();

      for(var i = 0; i < response.length; i++) {
        var task = response[i];
        $('#taskinfo').append('<tr></tr>');
        var $el = $('#taskinfo').children().last();
        $el.append('<td>' + task.id + '</td>');
        $el.append('<td>' + task.ticket_id + '</td>');
        $el.append('<td>' + task.detail + '</td>');


      }
    }
  });
}
