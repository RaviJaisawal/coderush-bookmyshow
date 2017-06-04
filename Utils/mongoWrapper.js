var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('resale', ['seatlayout']);
var bodyparser = require('body-parser');




var select = function(col,query,callback){
	console.log('request came to rapper');
	if (query == undefined) {
		console.log(query);
		return 'undefined query';
	}
	else{
		console.log('inside else');
		console.log(query);
		db.col.find(query,function(err,data){
			if (err) {
				console.log('error in select '+err);
				callback(err,null);
			}
			else{
			callback(null,data);
			}
		});
	}
}


var insert = function(dataInsertion,callback){
	console.log('Got request for singup');
	if (dataInsertion == undefined) {
		console.log('Data can not null');
	}
	else{
		console.log('inside else');
		console.log(dataInsertion);
		db.contactlist.insert(dataInsertion,function(err,data){
				if(err){
					console.log('Error %j',err);
					callback(err,null);
				}
				else{
					console.log('Data is %j',data);
					callback(null,data);
				}
		});
	}
}

var update = function(query,data,callback){
	console.log('Request for update');
	if(query == undefined || data == undefined){
		console.log('Data can not be null');
	}
	else{
		db.contactlist.update(query,data,function(err,data){
			if(err){
				callback(err,null);
			}
			else{
				callback(null,data);
			}
		});
	}
}



module.exports ={ select,insert,update};