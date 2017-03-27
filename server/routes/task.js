var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'chi', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

//Show ticket if there is any
router.get('/', function(req, res){
  // SELECT * FROM "books";
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('SELECT "taskinfo"."id" as id, "taskinfo"."ticket_id", "taskinfo"."detail" FROM "taskinfo" LEFT JOIN "tasking" ON "taskinfo"."id" = "tasking"."task_id" WHERE "tasking"."task_id" IS NULL ORDER BY "taskinfo"."id" DESC;', function(queryError, result){
      //  db.query('SELECT * FROM "taskinfo" ORDER BY "taskinfo"."id" DESC;', function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          // console.log(result); // Good for debugging
          res.send(result.rows);
        }//end 2nd set of if statement
      }); //end the function to select query
    } //end the 1st set of if statement
  }); //end of pool connection
}); //end of get route function
//get employee list
router.get('/employee', function(req, res){
  // SELECT * FROM "books";
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('SELECT * FROM "employee";', function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          // console.log(result); // Good for debugging
          res.send(result.rows);
        }//end 2nd set of if statement
      }); //end the function to select query
    } //end the 1st set of if statement
  }); //end of pool connection
}); //end of get route function

///post the ticket at 'addtask'
router.post('/addtask', function(req, res){
  console.log(req.body);
  var ticketID = req.body.id;
  var detail = req.body.detail;
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('INSERT INTO "taskinfo" ("ticket_id", "detail")' +
               ' VALUES ($1,$2);',
               [ticketID,detail], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

//assign a task to employee
router.post('/assigntask', function(req, res){
  console.log(req.body);
  var taskID = req.body.task_id;
  var employeeID = req.body.employee_id;
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('INSERT INTO "tasking" ("task_id", "employee_id")' +
               ' VALUES ($1,$2);',
               [taskID, employeeID], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

///work on progress
// SELECT "tasking"."task_id" as "task_id", "taskinfo"."detail" , "taskinfo"."ticket_id", "employee"."first_name" as first_name FROM "taskinfo"
// JOIN "tasking" ON "tasking"."task_id" = "taskinfo"."id"
// JOIN "employee" ON "employee"."id" = "tasking"."task_id"
//WHERE "tasking"."complete" IS FALSE
router.get('/wop', function(req, res){
  // SELECT * FROM "books";
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('SELECT "tasking"."task_id" as "task_id", "taskinfo"."ticket_id", "taskinfo"."detail" ,  "employee"."first_name" as first_name , "tasking"."complete" as complete FROM "taskinfo" JOIN "tasking" ON "tasking"."task_id" = "taskinfo"."id" JOIN "employee" ON "employee"."id" = "tasking"."employee_id" ;', function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          // console.log(result); // Good for debugging
          res.send(result.rows);
        }//end 2nd set of if statement
      }); //end the function to select query
    } //end the 1st set of if statement
  }); //end of pool connection
}); //end of get route function

//set the task to completed
router.put('/complete/:id', function(req, res){
  var id = req.params.id;


  console.log(req.body);
  console.log('id=' + id);


  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('UPDATE "tasking" SET "complete" = TRUE WHERE "task_id"=$1;',
      [id], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          res.sendStatus(202);
        }
      });
    }
  });
});

module.exports = router;
