//TODO Separate this logic and try to make it smarter , autoload based on files present etc

module.exports.setup = function(o){
  var util = require("util"),
      app = o.app,
//      redis = o.redis,
      socket = o.app.socket,
      cons = o.consolidate, 
      mongoose = o.mongoose,
      io = o.io,
      lessMiddleware = o.lessMiddleware, 
      express = o.express;
  
  Server.paths = o.paths;
  
  global.db = mongoose.connect("mongodb://localhost/datapimp");
  
  require("./models.js").autoload(db);
  require("./controllers.js").autoload(app);
  require("./routes.js").draw(app);
  
  app.configure(function(){
    app.engine('jade', cons.jade);

    app.set('view engine', 'jade');
    app.set('views', o.paths.views);

    app.use(express.bodyParser());
    app.use(app.router);
    app.use(lessMiddleware({
      src: o.paths.root,
      compress: true
    }));   
    app.use(express.methodOverride());
    app.use(express.static(o.paths.root));
  });
  
  app.listen(o.port || 3000);
  app.socket = io.listen(app);
/*
  // redis pub/sub with socket.io
  redis.subscribeTo("socket-io-broadcast:*",function(channel,message,pattern){
    var payload = JSON.stringify({
      'channel' : channel + '',
      'message' : message + ''
    });
    
    app.socket.broadcast(payload);
  });
*/  
  
};
