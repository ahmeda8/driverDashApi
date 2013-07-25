//user info module
var pg = require('pg');
var http = require('http');
var https = require('https');
var url = require('url');

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

exports.updateUser = function(userObj,callback)
{
	var sql = {
		text:"UPDATE users SET email= $1 , last_login = $2 where id = $3",
		values:[userObj.email,userObj.logintime,userObj.id]
	};
	query(sql,callback);
}

exports.addBackup = function(fileInfo,callback)
{
	var sql = {
			text:"INSERT INTO backupfiles (filename,download_url,created,id_user) values ($1,$2,$3,$4)",
			values:[fileInfo.filename,fileInfo.download_url,fileInfo.created,fileInfo.iduser]
		};
	query(sql,callback);
};

exports.deleteBackup = function(id,callback)
{
	var sql = {
		text:"SELECT * from backupfiles " +
			 "WHERE backupfiles.id = $1",
		values:[id]
		};
	query(sql,function(sql,res){
		
	 var urlParsed = url.parse(res.rows[0].download_url);
	 var urlpath = urlParsed.path+"?key=AQ4LQWd28TyS1wZtDX9Rjz";
	 var options ={
		hostname: urlParsed.hostname,
		path:urlpath,
		method:'DELETE',
		//port:80,
		headers:{
			'Content-Length':urlpath.length,
			'Connection':'keep-alive',
			'Content-Type':'text/plain',
			'User-Agent':'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:22.0) Gecko/20100101 Firefox/22.0'
		}
	 };
	 console.log(options);
	var req = https.request(options,function(res){
		console.log("Status code: "+res.statusCode);
		//console.log(options);
		if(res.statusCode == 200)
		{
			var sql = {
				text:"DELETE from backupfiles where id = $1",
				values:[id]
			};
			query(sql,callback);
		}
		else
		{
			callback(null,"error");
		}
		res.on('data', function(d) {
			console.log(d);
			callback(null,"data");
		});
	});
	
	req.on('error', function(e) {
	  console.log(e.message);
	  callback(null,e.message);
	});
	
	req.end();
	
	});
	
	

	
	/*
	var urlParsed = url.parse(fileinfo.url);
	 var options ={
		hostname: urlParsed.hostname,
		path:urlParsed.path,
		method:'DELETE',
		port:80,
		headers:{
			"content-length": fileinfo.url.length
		}
	 };
	 console.log(options);
	var req = http.request(options,function(res){
		console.log(res.statusCode);
		//console.log(options);
		if(res.statusCode == 200)
		{
			var sql = {
				text:"DELETE from backupfiles where id = $1",
				values:[fileInfo.id]
			};
			query(sql,callback);
		}
		else
		{
			callback(null,"error");
		}
		res.on('data', function(d) {
			console.log(d);
			callback(null,"data");
		  });
	});
	req.end();

	req.on('error', function(e) {
	  console.log(e);
	  callback(null,e);
	});
	/*
	else if(options.protocol == 'https:')
	{
		options.port = 443;
		https.request(options,function(res){
			if(res.statusCode == 200)
			{
				var sql = {
					text:"DELETE from backupfiles where id = $1",
					values:[fileInfo.id]
				};
				query(sql,callback);
			}
			else
			{
				callback(null,"error");
			}
		});
	}
	else
	{
		callback(null,"protocol not supported");
	}
	*/
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
	client.connectionParameters.ssl = true;
	client.connect(function(err){
		if(err == null)
		{
			client.query(sql,function(err,result){
				client.end();
				callback(err,result);
			});
		}
		else
			handleERR(0,err,callback);
	});
}

function handleERR(type,err,callback)
{
	console.log(err);
	switch(type)
	{
		case 0:
			callback(err,{rows:[{}]});
			break;
		case 1:
			callback([]);
	}
}

