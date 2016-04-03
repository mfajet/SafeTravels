var Promise         = require('bluebird');
var request 		= require('request');
var http 			= require('http'); 
var express 		= require('express');
var mysql      		= require('mysql');
var async      		= require('async');
var	config  		= require('./../config/config');
var connection 		= mysql.createConnection(config.services.mysql);
var Flickr 			= require("flickrapi");
var flickrOptions 	= config.api.flickr;

connection.connect();

module.exports.load_pictures_mysql = function(factors){
	var queries = [];


	connection.query("SELECT * FROM location", function (error, rows) {
		console.log("IN");

		for(var i=0 ; i < rows.length ; i++){
			var id = rows[i]['id'];
			var city = rows[i]['city'];
			var state = rows[i]['state'];
			var lat = rows[i]['lat'];
			var lng = rows[i]['lng'];
			var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ba0d55d25fae2fd7ee94d6695278adf5&tags=city+skyline&text="+ city +"&lat="+ lat + "&lon=" + lng + "&radius=10&format=json&nojsoncallback=1";

			queries.push([id, url]);

			console.log(rows.length, queries.length);
		}


		async.map(queries, function(query, callback) {
			var id = query[0];
			var query = query[1];

		    request(query, function (error, response, body) {
		    	try {
					if (!error && response.statusCode == 200) {
						body = JSON.parse(body);
						if (body["photos"]["photo"].length > 0){
							var data = body.photos.photo[0];
							var photo_id = data['id'];
							var secret = data['secret'];
							var server = data['server'];
							var farm = data['farm'];

							var picture = "https://farm"+ farm +".staticflickr.com/"+ server +"/"+ photo_id +"_"+ secret +".jpg"

							console.log(picture);

							connection.query("UPDATE location SET image = '"+ picture +"' WHERE id = " + id);
						}

						
						//callback(null, body);
					}
					else{
						//callback(error || response.statusCode);
					}

		    	}
		    	catch (err){		    		
		    	}
			})
			
		}, function(error, results) {
			if(error){ console.log('Error!'); return; }
			console.log(results);
		});



	});



};

