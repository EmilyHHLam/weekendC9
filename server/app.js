var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var task = require('./routes/task.js');

// Look for index.html in the public folder
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/task', task);

app.listen(port, function(){
  console.log("listening on port", port);
});
