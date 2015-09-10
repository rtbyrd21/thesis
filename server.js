var express  = require('express');
var app      = express();
var argv     = require('yargs').argv; if(!argv._.length){ argv._ = 'mongo'; };
var env      = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config   = require('./server/config')[env];
var dbConfig = require('./server/routes/index.js')[argv._];


require('./server/express.js')(app, config);

dbConfig.connect(config);
require(dbConfig.routes)(app);

app.listen(config.port);	
console.log('listening on port ' + config.port);