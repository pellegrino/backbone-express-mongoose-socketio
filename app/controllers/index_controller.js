var mongoose = require("mongoose");
var actions = {};
user = mongoose.model('User');
actions.index = function(request,response){
  user.find({}, function(err, docs){
    //util.puts(util.inspect(users));
    response.render('index',{
      results :  docs,
      total : docs.length
    })
  });
};

module.exports = actions;
