var express             = require('express');
var app                 = express();
var guid                = require('../guid.js')(app);
var cassandra           = require('../cassandra.js')();
var mongo               = require('../mongo');



module.exports = function(app){



app.get('/', function (req, res) {

        res.render('index', {
        })

})
}



