var express    = require('express');
var app        = express();
var path       = require('path');
var session    = require('express-session');
var bodyParser = require('body-parser');
var parseurl   = require('parseurl');

var sess = [];

var pushPages = function(req, res, next) {
  if(req.session.lastPage) {
    res.write('Last page was: ' + req.session.lastPage + '. \n' + sess + ' \n' + req.session.guid + ' \n'); }
  next();
};

var allowCORS = function(req,res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};  

var storePageVisits = function(req,res, next) {
  var views = req.session.views
  var pathname = parseurl(req).pathname

  if (!views) { views = req.session.views = {} }

  views[pathname] = (views[pathname] || 0) + 1
  req.views = views;
  next()
}; 

module.exports = function(app, config){
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'ejs');

	app.use(express.static('public'));
	app.use(session({ 
	  secret: 'keyboard cat', 
	  resave: true,
	  saveUninitialized: true, 
	  cookie: { maxAge: 60000 }
	}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(allowCORS);
	app.use(pushPages);
	app.use(storePageVisits)

}
