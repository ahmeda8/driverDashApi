//user info module
var pg = require("pg");

exports.createUser = function(userObj,callback)
{
	//console.log(userObj);
	var client = new pg.Client(process.env.HEROKU_POSTGRESQL_SILVER_URL);
	var sql = {
			text:"INSERT INTO users (fb_id,email,created,last_login,first_name,last_name) values ($1,$2,$3,$4,$5,$6)",
			values:[userObj.fbid,userObj.email,userObj.created,userObj.last_login,userObj.firstname,userObj.lastname]
			};
	
	client.connect(function(err){
		//console.log(err);
		client.query(sql,callback);
		});
};

exports.addBackupFile = function(fileInfo,callback)
{
	var client = new pg.Client(process.env.HEROKU_POSTGRESQL_SILVER_URL);
	var sql = {
		text:"select * from users where fb_id = $1",
		values:[fileInfo.fbid]
		};
	client.connect();
	var id;
	client.query(sql,function(err,result){
		//console.log(err);
		//console.log(result);
		if(result.rows[0] && result.rowCount == 1)
			id = result.rows[0].id;
	});
	
	sql = {
		text:"INSERT INTO backupfiles (filename,download_url,created,id_user) values ($1,$2,$3,$4)",
		values:[fileInfo.filename,fileInfo.dowload_url,fileInfo.created,id]
		};
	client.query(sql,callback);
	
};