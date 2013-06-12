//user info module
var pg = require("pg");

exports.createUser = function(userObj,callback)
{
	console.log(userObj);
	var client = new pg.Client(process.env.HEROKU_POSTGRESQL_SILVER_URL);
	var sql = {
			text:"INSERT INTO users (fb_id,email,created,last_login,first_name,last_name) values ($1,$2,$3,$4,$5,$6)",
			values:[userObj.fbid,userObj.email,userObj.created,userObj.last_login,userObj.firstname,userObj.lastname]
			};
	
	client.connect();
	
	client.query(sql,function(err,result){
		console.log(err);
		client.end();
	});
}