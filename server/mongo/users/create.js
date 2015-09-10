(function createUser() {
  'use strict';

  var User = require('../models/users');


  module.exports = function(req, res) {
    var newUser = new User(req.body);
    console.log(newUser);

    newUser.save(function(err, user) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  };
})();
