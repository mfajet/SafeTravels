angular.module('starter.services', [])

.factory('Cities', function($http) {
  // Might use a resource here that returns a JSON array
    var citiesJSON = {};
        
     var req = new XMLHttpRequest();
        req.open("GET", "http://Ec2-54-165-0-245.compute-1.amazonaws.com:3000/api/city?city=", false);
        req.setRequestHeader("Content-type", "application/json");
        req.send(null);
    
    citiesJSON = JSON.parse(req.responseText).results;
    console.log( citiesJSON);
   

  return {
    all: function() {
      return citiesJSON;
    },
    remove: function(city) {
      citiesJSON.splice(citiesJSON.indexOf(city), 1);
    },
    get: function(cityId, rand) {
        if(!rand){
      for (var i = 0; i < citiesJSON.length; i++) {
        if (citiesJSON[i].id === parseInt(cityId)) {
          return citiesJSON[i];
        }
      }
        } else{
            return citiesJSON[Math.floor(Math.random()*5)];
        }
      return null;
    }, size: function(){
        return citiesJSON.length;
    }, update: function(toFind){
        var req = new XMLHttpRequest();
        req.open("GET", "http://Ec2-54-165-0-245.compute-1.amazonaws.com:3000/api/city?city=" + toFind, false);
        req.setRequestHeader("Content-type", "application/json");
        req.send(null);
    
    citiesJSON = JSON.parse(req.responseText).results;
        console.log(citiesJSON);
        return citiesJSON;
    }
      
  };
});
