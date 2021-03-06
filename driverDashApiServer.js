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
		if(err == null)
			res.send(JSON.stringify(result));
		else
		{
			ui.getUserByFacebook(userObj.fbid,function(err,result){
				res.send(JSON.stringify(result.rows[0]));
			});
		}
	});
});

app.post('/backup', function(request, response) {
	
	var info = JSON.parse(request.body.info);
	console.log(info);
	var ui = require("./userinfo.js");
	ui.addBackup(info,function(err,result)
	{
		response.send(JSON.stringify(result));
	});
});

/*END POST API*/

/* PUT /Updatre procedeures */

app.put('/user',function(req,res){
	var user = JSON.parse(req.body.user);
	var ui = require("./userinfo.js");
	ui.updateUser(user,function(err,result)
	{
		res.send(JSON.stringify(result));
	});
});
/*END PUT */

/*Delete API*/
app.delete('/backup/:id',function(req,res){
	var info = req.params.id;
	//console.log(req.body.info);
	var ui = require("./userinfo.js");
	ui.deleteBackup(info,function(err,result){
		res.send(JSON.stringify(result));
	});
	
});
/*end of deletes*/

/*START GET API*/

app.get('/user/:fbid',function(req,res) {
	var ui = require("./userinfo.js");
	ui.getUserByFacebook(req.params.fbid,function(err,result){
		res.send(JSON.stringify(result.rows));
	});
});

app.get('/user/backups/:iduser', function(req, response) {
  var ui = require("./userinfo.js");
  ui.getBackups(req.params.iduser,function(err,data){
	  response.send(JSON.stringify(data.rows));
  });
});
/*end get api*/

/*SERVER*/
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
