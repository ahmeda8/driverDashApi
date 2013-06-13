//user info module
var pg = require("pg");

exports.addUser = function(userObj,callback)
{
	//console.log(userObj);
	var sql = {
			text:"INSERT INTO users (fb_id,email,created,last_login,first_name,last_name) values ($1,$2,$3,$4,$5,$6)",
			values:[userObj.fbid,userObj.email,userObj.created,userObj.last_login,userObj.firstname,userObj.lastname]
		};
	query(sql,callback);
};

exports.getUserByFacebook = function(fbid,callback)
{
	var sql = {
			text:"select * from users where fb_id = $1",
			values:[fbid]
			};
	query(sql,callback);
};

exports.addBackup = function(fileInfo,callback)
{
	var sql = {
			text:"INSERT INTO backupfiles (filename,download_url,created,id_user) values ($1,$2,$3,$4)",
			values:[fileInfo.filename,fileInfo.download_url,fileInfo.created,fileInfo.iduser]
		};
	query(sql,callback);
};

exports.getBackups = function(id,callback)
{
	var sql = {
		text:"SELECT * from backupfiles " +
			 "WHERE backupfiles.id_user = $1",
		values:[id]
		};
	query(sql,callback);
	
};

function query(sql,callback)
{
	var client = new pg.Client(process.env.HEROKU_POSTGRESQL_SILVER_URL);
	client.connect(function(err){
		if(err == null)
			client.query(sql,callback);
		else
			handleERR(0,err,callback);
	});
}

function handleERR(type,err,callback)
{
	switch(type)
	{
		case 0:
			callback(err,{rows:[{}]});
			break;
		case 1:
			callback([]);
	}
}

