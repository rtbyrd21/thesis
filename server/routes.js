var express             = require('express');
var app                 = express();
var getAccountResponse  = require('./getAccountResponse.js')(app);
var guid                = require('./guid.js')(app);
var cassandra           = require('./cassandra.js')();
var mongo              = require('./mongo');



module.exports = function(app){

app.post('/eligibility', function (req, res) {

 var current = new Date();
 var start = current - (24*1000*60*60);
 var params = [req.body.guid, start, current];

  client.execute(cassandra.getEligibility, params, {prepare: true}, function(err, result){
      if(err){
        res.status(404).send({message:err});
      }else{
        res.json(result);
      }
  });
})

app.post('/user', function (req, res) {
 var timestamp = new Date();
 var params = [req.body.guid, timestamp, req.body.events];

  client.execute(cassandra.upsertUser, params, { prepare: true},
    function(err, result){
      if(err){
          res.status(404).send(err);
        }else{
          console.log(timestamp);
        }
    });
})



app.post('/usermongo', mongo.user.findOne, function(req, res){
  if(req.new){
    mongo.user.update(req, res);
  }else{
    mongo.user.create(req, res);
  }
});


app.post('/entry', function (req, res) {
  var params = [req.body.start, req.body.end];
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

app.get('/drawing', function (req, res) {
 client.execute(cassandra.getAllUsers, [], function(err, result){
      if(err){
        res.status(404).send({message:err});
      }else{
        var a = result.rows;
        var myArray = [];
        a.forEach(function(entry) {
            myArray.push(entry.guid);
        });
        res.json(myArray[Math.floor((Math.random() * myArray.length))]);
      }
  });
})


app.get('/:guid', function (req, res) {
  client.execute(cassandra.getUserById, [req.params.guid], function(err, result){
      if(err){
        res.status(404).send({message:err});
      }else{
        res.render('subscriber', {
          guid: result.rows[0].guid,
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



