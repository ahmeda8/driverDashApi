//node js main se4rver file
var express = require("express");
var util = require("util");
var pg = require('pg');
var querystring = require("querystring");
var app = express();
var fs = require("fs");
app.use(express.logger());
app.use(express.bodyParser());

app.get('/', function(request, response) {
  response.send('Driver DASH API Root');
});

app.post('/user',function(req,res)
{
	if(!process.env.HEROKU_POSTGRESQL_SILVER_URL)
		process.env.HEROKU_POSTGRESQL_SILVER_URL = "postgres://ydgammzyfnciqp:8Z0VP8iiaO9qeWrmpQYROn0fpc@ec2-107-20-215-249.compute-1.amazonaws.com:5432/d9d08kbuji2has";
	
	var userObj = JSON.parse(req.body.user);
	var ui = require("./userinfo.js");
	//console.log(process);
	
	ui.createUser(userObj,function(err,result)
	{
		res.send(util.inspect(err));
	});
	
	//res.send("ok");
});

app.get('/user/:fbid', function(req, response) {
  var ui = require("./userinfo.js");
  var name = ui.getName(1);
  //var name = util.inspect(ui);
  response.send('Driver DASH API User'+name+"---"+req.params.id+"---"+req.params.fbid);
  response.send(util.inspect(app.routes));
});

app.post('/backup', function(request, response) {
	
	var info = JSON.parse(request.body.info);
	console.log(info);
	var ui = require("./userinfo.js");
	ui.addBackupFile(info,function(err,result)
	{
		response.send(util.inspect(result));
	});
});

app.get('/restore', function(request, response) {
  response.send('Driver DASH API! Resttore');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
