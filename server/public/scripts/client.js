$(document).ready(function(){
console.log('jQuery sourced');

var itteam = {};
var current=0;
var ticketId ;
var ticketDetail;
var employeeId;


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
      $('.taskinfo').empty();
      for(var i = 0; i < response.length; i++) {
        var task = response[i];
        ticketId = task.ticket_id;
        ticketDetail = task.detail;
        $('.taskinfo').append('<tr></tr>');
        var $el = $('.taskinfo').children().last();
        $el.append('<td>' + task.id + '</td>');
        $el.append('<td>' + ticketId + '</td>');
        $el.append('<td>' + ticketDetail + '</td>');
        getEmployee();
      }//end for loop

    }//end sucess
  });//end ajax
}//end the gettask()
//  NOT WORKING - try to grab the assiging employee
$("#target").change( function() {
  console.log('come here');
// var selectedOption = $("#targetEmployee option:selected");
// var selectedValue = selectedOption.val();  // gets the selected value
//  var selectedText = selectedOption.text();  // gets the selected text
});

$('.taskinfo').on('click', '.assignnow', function() {
  console.log('here');
  });
//   //console.log('delete book' + $(this).data('book'));
//   // $.ajax({
//   // type: 'DELETE',
//   // url: '/books/delete/' + $(this).data('book'),
//   // success: function(response) {
//   //   getBooks();
//   // }
//   //
//   });


//dropdown list of empployees
var employee =[];
function getEmployee() {

var option = '';
var numbers;
  $.ajax({
  type: "GET",
  url:'/task/employee',
  success: function(employee) {
    console.log(employee);

  }//end loop
  });
  //NOT WORKING - how to get the array out of the function
console.log('outside=' + employee);
  var employee = [{"id":1,"first_name":"Emily"},
                  {"id":2,"first_name":"Brit"}];

    for (var i=0;i<employee.length;i++){
      employeeID = employee[i].id ;

      //var employee = response[i];
       option += '<option value="'+ employeeID + '">' + employee[i].first_name + '</option>';
    }

  var $el = $('.taskinfo').children().last();
  $el.append('<td><select id ="target">' + option + '</select></td>');
  $el.append('<div id="result1"></div>');
  $el.append('<td><button class="assignnow" data-id="' +
                      ticketId +'" data-detail= "' + ticketDetail + '" employeeid= "' + employeeID + '">assign task</button>');




}
