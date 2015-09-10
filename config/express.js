(function expressConfig() {
  'use strict';

  var path       = require('path');
  var express    = require('express');
  var logger     = require('morgan');
  var bodyParser = require('body-parser');
  //var exphbs     = require('express-handlebars');

  module.exports = function(app) {
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(express.static(path.resolve(__dirname, '../public')));
  }
})();
