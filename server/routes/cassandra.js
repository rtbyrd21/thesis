var express             = require('express');
var app                 = express();
var getAccountResponse  = require('../getAccountResponse.js')(app);
var guid                = require('../guid.js')(app);
var cassandra           = require('../cassandra.js')();
var mongo               = require('../mongo');



module.exports = function(app){

app.post('/eligibility', function (req, res) {
  var params = [req.body.id];
  client.execute(cassandra.getEligibility, params, {prepare: true}, function(err, result){
    if(err){
      res.status(404).send({message:err});
    }else{
      var result = result.rows;
      guid.checkEligibility(result).then(function(data){
            res.send(data);
      });
    }
  });
})


app.post('/user', function (req, res) {
 var params = [req.body.user_id, req.body.entries];
  client.execute(cassandra.upsertUser, params, { prepare: true},
    function(err, result){
      if(err){
          res.status(404).send(err);
        }else{
          console.log(result);
        }
    });
})


app.post('/entry', function (req, res) {
  var params = [req.body.user_id, req.body.start, req.body.end];
  client.execute(cassandra.getEventByTimeRange, params, {prepare: true}, function(err, result){
  		if(err){
  			res.status(404).send({message:err});
  		}else{
  			res.json(result);
  		}
  });
})

app.get('/account', function (req, res) {
  getAccountResponse.then(function(response){
		res.json(response.userProfile.userId);
	});
})

app.post('/guid', function (req, res) {
  var id = req.body.id;
  guid.assureGUID(id).then(function(data){
  	res.json(data);
  	req.session.guid = data.guid;
  }).catch(function(err){
  	res.json(err);
  });
})

app.post('/mapped', function (req, res) {
  var id = req.body.id;
  guid.mapGUID(id).then(function(data){
    res.json(data);
  }).catch(function(err){
    res.json(err);
  });
})


app.get('/:guid', function (req, res) {
  client.execute(cassandra.getUserById, [req.params.guid], function(err, result){
      if(err){
        res.status(404).send({message:err});
      }else{
        res.render('subscriber', {
          guid: result.rows[0].id,
          data: result.rows,
          views:req.views['/detail']
        });
      }
  });
})

app.get('/', function (req, res) {
  client.execute(cassandra.getAllUsers, [], function(err, result){
      if(err){
        res.status(404).send({message:err});
      }else{
        res.render('index', {
           users: result.rows,
           views:req.views['/index']
        })
      }
  });
})
}



