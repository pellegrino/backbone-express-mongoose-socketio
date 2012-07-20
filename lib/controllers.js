module.exports = Server.controllers = {
  controller_objects : {}
};

Server.controllers.autoload = function(db){
  var fs = require("fs"),
      path = require("path"),
      util = require("util"),
      files = fs.readdirSync( Server.paths.controllers ),
      sharedUtil = require("./shared_util"),
      names = _.map(files,function(f){
        return( path.basename(f) );
      });
    

  _.each(names,function(controller){
    var c_id = sharedUtil.camelize( controller.replace(/.js$/,'') );
    Server.controllers.controller_objects[c_id] = 
      require( Server.paths.controllers + "/" + controller );
  });
};
