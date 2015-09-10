(function entryModel() {
  'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
	_id: false,
	timeStamp: { type: Date, default: Date.now },
	data : [Schema.Types.Mixed]
});

module.exports = {
  schema: entrySchema,
  model: mongoose.model('Entry', entrySchema)
}

})();