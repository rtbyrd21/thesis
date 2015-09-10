(function updateUser() {
  'use strict';

  var User = require('../models/users');


  module.exports = function(req, res) {
    var item = req.body;
    User.findById(req.body._id, function(err, user) {
    console.log(user);
      if (err) {
        res.sendStatus(500);
      } else {
        user.entries = user.entries.concat(item.entries);  
      }
      user.save(function(err){
        if(err){
          res.send(err)
        }else{
          res.json({ message: 'User updated!' });
        }
      })  

    });
  };
})();