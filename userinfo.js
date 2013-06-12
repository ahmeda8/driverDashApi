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

exports.getUserByFacebook = function(fbid,callback)
{
	var client = new pg.Client(process.env.HEROKU_POSTGRESQL_SILVER_URL);
	var sql = {
			text:"select * from users where fb_id = $1",
			values:[fbid]
			};
	
	client.connect(function(err){
		client.query(sql,callback);
		});
};

exports.addBackupFile = function(fileInfo,callback)
{
	var client = new pg.Client(process.env.HEROKU_POSTGRESQL_SILVER_URL);
	client.connect();
	if(id!=null)
	{
		sql = {
			text:"INSERT INTO backupfiles (filename,download_url,created,id_user) values ($1,$2,$3,$4)",
			values:[fileInfo.filename,fileInfo.download_url,fileInfo.created,fileInfo.iduser]
			};
		client.query(sql,callback);
	}
};

exports.getBackups = function(id,callback)
{
	//console.log(fbid);
	/*
	var conOptions = {
	user:'ydgammzyfnciqp',
	password:'8Z0VP8iiaO9qeWrmpQYROn0fpc',
	database:'d9d08kbuji2has',
	host:'ec2-107-20-215-249.compute-1.amazonaws.com',
	ssl:true
	};*/
	var client = new pg.Client(process.env.HEROKU_POSTGRESQL_SILVER_URL);
	//var client = new pg.Client(conOptions);
	
	console.log(client);
	var sql = {
		text:"SELECT * from backupfiles " +
			 "WHERE backupfiles.id_user = $1",
		values:[fbid]
		};
	client.connect();
	client.query(sql,function(err,result){
		console.log(err);
		callback(result.rows);
	});
	
};