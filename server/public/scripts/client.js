var current=0;
var taskId ;
var ticketDetail;
var employeeId;
var employees = [];
$(document).ready(function(){
console.log('jQuery sourced');
//showing the task list
getTask();
//showing the work-on-progress
workOnProgress();

$('.taskinfo').on('click', '.assignnow', function() {
  // console.log($(this).data("employeeid"));
  // console.log($(this).data("id"));
  // console.log($(this).data("detail"));
  var taskId = $(this).data("id");
  var selectEL = $('#target' + taskId);
  console.log('selectId' + selectEL.val());
  var employeeId = selectEL.val();
  $.ajax( {
  type: 'POST',
  url: 'task/assigntask/',
  data: {task_id: taskId, employee_id: employeeId },
  success: function(response){
    console.log('assign' + response);
      getTask();
      workOnProgress();
  }
});//end of ajax
});//end of clicking taskinfo
//change status to complete
$('.working').on('click', '.complete', function() {
  console.log('set complete');
  console.log($(this).data('id'));
   $.ajax( {
   type: 'PUT',
   url: '/task/complete/' + $(this).data('id'),
   success: function(response) {
  //       // Refresh our data
        workOnProgress();
      }//end success function
    });//end of ajax
});//end of working div

//complete then delete, confirm if the task is ready to delete
$('.working').on('click', '.delete', function() {
  var checkstr =  confirm('are you sure you want to delete task ' + $(this).data('id') + '?');
  if(checkstr == true){
    var taskId = $(this).data('id');
    console.log('delete here' + taskId);
    $.ajax({
    type: 'DELETE',
    url: '/task/delete/' + taskId,
    success: function(response) {
        workOnProgress();
    }
    });
  }else{
  return false;
  }
  })
//adding the new task
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
  getEmployees();
  $.ajax({
    type: "GET",
    url: "/task",
    success: function(response) {
      console.log('Tasks: ' + response);
      displayTaskList(response);

    }//end sucess
  });//end ajax
}//end the gettask()
//  NOT WORKING - try to grab the assiging employee
function displayTaskList(tasks) {
  $('.taskinfo').empty();
  for(var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    taskId = task.id;
    ticketDetail = task.detail;
    $('.taskinfo').append('<tr></tr>');
    var $el = $('.taskinfo').children().last();
    $el.append('<td>' + taskId+ '</td>');
    $el.append('<td>' + task.ticket_id + '</td>');
    $el.append('<td>' + ticketDetail + '</td>');
    var option = displayEmployeeList(employees);
    $el.append('<td><select id ="target' + taskId + '">' + option + '</select></td>');
    $el.append('<td><button class="assignnow" data-id="' +
                taskId +'" data-detail= "' + ticketDetail + '" data-employeeid= "' + employeeID + '">assign task</button>');

  }//end for loop
}

//dropdown list of employees
function getEmployees() {
  var numbers;
  $.ajax({
    type: "GET",
    url:'/task/employee',
    success: function(response) {
      console.log(employees);
        employees = response;
  }//end loop
  });

}
function displayEmployeeList(employees) {
        var option = '';
        for (var i=0;i<employees.length;i++){
            employeeID = employees[i].id ;
             option += '<option value="'+ employeeID + '">' + employees[i].first_name + '</option>';
        }
        return option;
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
        var complete =task.complete;
        console.log(complete);

        $('.working').append('<div class="col-xs-6 col-md-3"><p ></p></div>');

        var $el = $('.working').children().last();
        $el.append('<p>' + taskId+ '</p>');
        $el.append('<p>' + ticketId + '</p>');
        $el.append('<p>' + detail + '</p>');
        $el.append('<p>' + employeeName + '</p>');
        if (complete) {
        $el.append('<p align="middle"><img width="15px" height="15px" src="https://balance.ua/img/news/5P8rB9KTzPEbTezNS64JxF50f0PuOCNi_preview/14788457491008.jpg"></p>')
        }else {
        $el.append('<p><button class="complete" data-id="'+
                        taskId +'">Complete</button>');
        }
        $el.append('<p><button class="delete" data-id="'+
                        taskId +'">Delete</button>');
      }//end for loop
    }//end sucess
  });//end ajax
}//end the gettask()
