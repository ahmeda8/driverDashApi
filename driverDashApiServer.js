//node js main se4rver file
var express = require("express");
var util = require("util");
var pg = require('pg');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Driver DASH API Root');
});

app.get('/user', function(request, response) {
  response.send('Driver DASH API User');
});

app.get('/backup', function(request, response) {
  response.send('Driver DASH API! Backup');
});

app.get('/restore', function(request, response) {
  response.send('Driver DASH API! Resttore');
});

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on " + port);
});
