//node js main se4rver file
var express = require("express");
var util = require("util");
var pg = require('pg');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Driver DASH API Root');
});

app.get('/user/:id/:fbid', function(req, response) {
  var ui = require("./userinfo.js");
  var name = ui.getName(1);
  //var name = util.inspect(ui);
  response.send('Driver DASH API User'+name+"---"+req.params.id+"---"+req.params.fbid);
  response.send(util.inspect(app.routes));
});

app.get('/backup/:fbid', function(request, response) {
    var savefile = require("./savefile.js");
    var ex;
    savefile.directoryExists("backups",function(exists)
        {
            ex = exists;
        });
  response.send('Driver DASH API! Backup'+ex);
});

app.get('/restore', function(request, response) {
  response.send('Driver DASH API! Resttore');
});

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on " + port);
});
