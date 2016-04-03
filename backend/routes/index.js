var express 		= require('express');
var request			= require('request');
var	config  		= require('./../config/config');
var util 			= require('./../util/utilities');
var router 			= express.Router();
var Promise 		= require('bluebird');
var mysql      		= require('mysql');
var cors 			= require('cors');

var classifier 		= require('./../modules/classifier');
var connection 		= mysql.createConnection(config.services.mysql);


connection.connect();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});



router.get('/api/city', cors(), function(request, response){
	if (typeof request.query.city !== 'undefined'){
		var city = request.query.city;
		var limit = 20000;

		connection.query({
			sql: "SELECT * FROM location WHERE city LIKE ? LIMIT ? ;",
			timeout: 40000,
			values: [city + '%', limit]
		}, function (error, results, fields) {
			response.json({			
				results: results
			});
		});
	}
	else{
		response.json("Invalid request");
	}	
});



router.get('/api/ranking', cors(), function(req, resp){
	if (typeof req.query.factors !== 'undefined'){
		var factors = req.query.factors;

		var json_body = {"input":[{"age":43,"marital":"MARRIED"},{"age":54,"marital":"DIVORCED"},{"age":32,"marital":"NEVER MARRIED"}]};
		var options = {
			uri: 'http://ec2-54-152-185-202.compute-1.amazonaws.com/ocpu/library/tvscore/R/tv/json',
			method: 'POST',
			json: true,
			body: json_body
		};

		

		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resp.json({			
					results: response.body
				});
			}
			else {
				resp.json(error);
			}
		});	
	}
	else{
		resp.json("Invalid request");
	}	
});




router.post('/api/factor', cors(), function(request, response, next){
	if (typeof request.body.lyrics !== 'undefined'){
		var lyrics = request.body.lyrics;
		response.json({			
			emotion: ""
		});
	}
	else{
		response.json("Invalid request");
	}	
});






module.exports = router;

function apiError(res) {
	return function (error) {
		if (!isApiError(error)) logger.error(error);

		var reportedError = getReportedError(error);
		res.status(reportedError.code).json(reportedError);
	};
}