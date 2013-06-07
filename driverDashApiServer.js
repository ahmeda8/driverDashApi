//node js main se4rver file
var express = require("express");
var util = require("util");
var pg = require('pg');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {


/*
pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM your_table');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});
*/
  response.send('Driver DASH API!');
});

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on " + port);
});
