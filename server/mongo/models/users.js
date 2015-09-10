(function userModel() {
  'use strict';

var mongoose = require('mongoose');
var Entry    = require('./entry');
var Schema   = mongoose.Schema;

var usersSchema = new Schema({
	_id: String,
	entries: [Entry.schema]
});

module.exports = mongoose.model('Users', usersSchema);

})();