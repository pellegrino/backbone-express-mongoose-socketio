module.exports = Server.models = {};

Server.models.autoload = function(db){
  var fs = require("fs"),
      path = require("path"),
      mongoose = require("mongoose"),
      util = require("util"),
      files = fs.readdirSync( Server.paths.models ),
      names = _.map(files,function(f){
        return( path.basename(f) );
      });
      //Model = mongoose.noSchema('test', db);
      //mongoose.load(Server.paths.models);


  _.each(names,function(model){
    require( Server.paths.models + "/" + model );
  });
  util.puts(util.inspect(Server.models));
};
