var express    = require('express');
var Q          = require('q');
var request    = require('request');
var uuid       = require('uuid');
var util       = require('util');
var moment     = require('moment');
var tempId;

module.exports = function(app){
	
var assureGUID = function(id) {
	return getGUID(id);
};

var mapGUID = function(id) {
	return getMappedGUID(id);
};


var getGUID = function(id) {

	var deferred = Q.defer();

	var getGUIDOptions = {
	  url: 'http://u060ecsa81.kroger.com:10016/guidmapper/original-guid',
	  method: 'POST',
	  headers: {
	    'x-correlation-id': uuid.v1(),
	    'Content-Type': 'application/json'
	  },
	  json: {
	    "guid": id
	  }
	};

	request(getGUIDOptions, function(err,resp,body){
	  if(err){
	    deferred.reject(err);
	  }
	  if(!('object'===typeof body && 'string'===typeof body.guid && body.guid)){
	    deferred.reject(new Error('failed to retrieve GUID, resp: '+util.inspect(resp,{depth:null})));
	  }
	  deferred.resolve(body);
	});

  return deferred.promise;

};

var mapGUID = function(id) {

	var deferred = Q.defer();
	var getGUIDOptions = {
	  url: 'http://u060ecsa81.kroger.com:10016/guidmapper/mapped-guid',
	  method: 'POST',
	  headers: {
	    'x-correlation-id': uuid.v1(),
	    'Content-Type': 'application/json'
	  },
	  json: {
	    "guid": id
	  }
	};

	request(getGUIDOptions, function(err,resp,body){
	  if(err){
	    deferred.reject(err);
	  }
	  if(!('object'===typeof body && 'string'===typeof body.guid && body.guid)){
	    deferred.reject(new Error('failed to retrieve GUID, resp: '+util.inspect(resp,{depth:null})));
	  }
	  deferred.resolve(body);
	});
  return deferred.promise;
};


var checkEligibility = function(result){

	var deferred = Q.defer();
  var today = moment().format("MMMM Do YY");
  var log = [];

    result.forEach(function(item){
      var date = item['dateOf(entry_id)'];
      log.push(moment(item).format("MMMM Do YY"));
    })

    if(log.indexOf(today) > -1){
    	deferred.resolve({'isEligible': false });		
    }else{
      deferred.resolve({'isEligible': true });
    }
  return deferred.promise;
}


return {
		assureGUID : assureGUID,
		mapGUID    : mapGUID,
		checkEligibility    : checkEligibility
	}

}
