//save the uploaded file
var fs = require("fs");

exports.directoryExists = function(directory,callback)
{
    var exists = fs.exists(directory,callback);
}

exports.createDirectory = function(directory,callback)
{
    fs.mkdir(directory,777,callback);
}

exports.directoryStat = function(direcotry,callback)
{
    fs.lstat(directory,callback);
}

