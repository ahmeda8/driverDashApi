//node js main se4rver file
var express = require("express");
var util = require("util");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!'+util.inspect(process.env));
});

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on " + port);
});
