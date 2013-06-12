//user info module
var pg = require("pg");

exports.createUser = function(userObj,callback)
{
	var client = new pg.Client(process.HEROKU_POSTGRESQL_SILVER_URL);
	var sql = "INSERT INTO users (fb_id,email,created,last_login,first_name,last_name) values ($1,$2,$3,$4,$5,$6)";
	client.connect(function(err){
		client.query(sql,[userObj.fbid,userObj.email,userObj.created,userObj.last_login,userObj.firstname,userObj.lastname],callback);
		});
}