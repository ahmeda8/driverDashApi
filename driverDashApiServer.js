//node js main se4rver file
var express = require("express");
var util = require("util");
var querystring = require("querystring");
var app = express();
app.use(express.logger());
app.use(express.bodyParser());

if(!process.env.HEROKU_POSTGRESQL_SILVER_URL)
		process.env.HEROKU_POSTGRESQL_SILVER_URL = "postgres://ydgammzyfnciqp:8Z0VP8iiaO9qeWrmpQYROn0fpc@ec2-107-20-215-249.compute-1.amazonaws.com:5432/d9d08kbuji2has";

/*POST API*/
app.post('/user',function(req,res)
{
	var userObj = JSON.parse(req.body.user);
	var ui = require("./userinfo.js");
	ui.addUser(userObj,function(err,result)
	{
		res.send(util.inspect(err));
	});
});

app.post('/backup', function(request, response) {
	
	var info = JSON.parse(request.body.info);
	console.log(info);
	var ui = require("./userinfo.js");
	ui.addBackup(info,function(err,result)
	{
		response.send(util.inspect(result));
	});
});

/*END POST API*/

/*START GET API*/

app.get('/user/:fbid',function(req,res) {
	var ui = require("./userinfo.js");
	ui.getUserByFacebook(req.params.fbid,function(err,result){
		res.send(util.inspect(result.rows[0]));
	});
});

app.get('/user/backups/:iduser', function(req, response) {
  var ui = require("./userinfo.js");
  ui.getBackups(req.params.iduser,function(err,data){
	  response.send(util.inspect(data.rows));
  });
});
/*end get api*/

/*SERVER*/
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
