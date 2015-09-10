(function findUser() {
  'use strict';

  var mongoose = require('mongoose');

  var User = require('../models/users');

  mongoose.connect('mongodb://localhost/guid');
  var db = mongoose.connection;

  module.exports = function(req, res, next) {
    User.findById({_id: req.body._id}, function(err, user) {
      if (err) {
        res.sendStatus(500);
        next(console.log(err));
      } else {
      	if(user){
      		req.new = true;
      		next();
      	}else{
      		req.new = false;
      		next();
      	}        
      }
    });
  };

})();