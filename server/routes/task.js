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
      db.query('SELECT * FROM "taskinfo" ORDER BY "id" DESC;', function(queryError, result){
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



module.exports = router;
