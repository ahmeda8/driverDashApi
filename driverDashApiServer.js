//node js main se4rver file
var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on " + port);
});