$(document).ready(function(){
console.log('jQuery sourced');

var itteam = {};
var current=0;
var taskId ;
var ticketDetail;
var employeeId;


//showing the task list
getTask();

//showing the work-on-progress
workOnProgress();

$('.taskinfo').on('click', '.assignnow', function() {
  console.log('here')
  console.log($(this).data("employeeid"));
  console.log($(this).data("id"));
  console.log($(this).data("detail"));
  $('.taskinfo').empty();
  $.ajax( {
  type: 'POST',
  url: 'task/assigntask',
  data: {task_id: $(this).data("id"), employee_id: $(this).data("employeeid") },
  sucess: function(response){
    console.log(response);
      getTask();
  }
});//end of ajax
});//end of clicking taskinfo

//change status to complete


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
        taskId = task.id;
        ticketDetail = task.detail;
        $('.taskinfo').append('<tr></tr>');
        var $el = $('.taskinfo').children().last();
        $el.append('<td>' + taskId+ '</td>');
        $el.append('<td>' + task.ticket_id + '</td>');
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
                      taskId +'" data-detail= "' + ticketDetail + '" data-employeeid= "' + employeeID + '">assign task</button>');




}
//work-on-progress
function workOnProgress() {
  $.ajax({
    type: "GET",
    url: "/task/wop",
    success: function(response) {
      console.log(response);
      $('.working').empty();
      for(var i = 0; i < response.length; i++) {
        var task = response[i];
        var taskId = task.task_id;
        var ticketId = task.ticket_id;
        var detail = task.detail;
        var employeeName = task.first_name;

        $('.working').append('<tr></tr>');
        var $el = $('.working').children().last();
        $el.append('<td>' + taskId+ '</td>');
        $el.append('<td>' + ticketId + '</td>');
        $el.append('<td>' + detail + '</td>');
        $el.append('<td>' + employeeName + '</td>');
        $el.append('<td><button class="complete" data-id="'+
                        taskId +'">Complete</button>');
        $el.append('<td><button class="delete" data-id="'+
                        taskId +'">Delete</button>');
      }//end for loop
    }//end sucess
  });//end ajax
}//end the gettask()
