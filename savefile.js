//save the uploaded file
var fs = require("fs");

exports.directoryExists = function(directory,callback)
{
    var exists = fs.exists(directory,function(exists,callback){
        fs.mkdir(directory,callback);
    });
}

