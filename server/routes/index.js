var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var mongoose = require('mongoose');
var cassandra  = require('cassandra-driver');
client = new cassandra.Client( { contactPoints : [ '127.0.0.1' ] } );
  

module.exports = {
  mongo:{
    routes: path.join(__dirname, './mongo.js'),
    connect: function(config){
      mongoose.connect(config.db);
      var db = mongoose.connection;
      db.on('error', function callback () {
        console.log("Connection error");
      });
      db.once('open', function callback () {
        console.log("Mongo Connected");
      });
    }
  }, 
  cassandra: {
    routes: path.join(__dirname, './cassandra.js'),
    connect: function(config){
        client.connect(function(err, result) {
         if(err){
          console.log('hi');
         }else{ 
          console.log('Cassandra Connected.');
        }
      });
    } 
  },
  postgres: {
    routes: path.join(__dirname, './cassandra.js'),
    connect: function(config){
        client.connect(function(err, result) {
         if(err){
          console.log(err);
         }else{ 
          console.log('Cassandra Connected.');
        }
      });
    } 
  }
}