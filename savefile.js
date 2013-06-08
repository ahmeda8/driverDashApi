//save the uploaded file
var fs = require("fs");

exports.directoryExists = function(directory,callback)
{
    var exists = fs.exists(directory,function(exists){
        if(!exists)
            fs.mkdir(directory,777,callback);
    });
}

