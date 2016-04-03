angular.module('starter.services', [])

.factory('Cities', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cities = [{
    id: 0,
    name: 'Miami',
    info: 'You on your way?',
    image: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    info: 'Hey, it\'s me',
    image: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    info: 'I should buy a boat',
    image: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    info: 'Look at my mukluks!',
    image: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    info: 'This is wicked good ice cream.',
    image: 'img/mike.png'
  }];

  return {
    all: function() {
      return cities;
    },
    remove: function(city) {
      cities.splice(cities.indexOf(city), 1);
    },
    get: function(cityId, rand) {
        if(!rand){
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].id === parseInt(cityId)) {
          return cities[i];
        }
      }
        } else{
            return cities[Math.floor(Math.random()*5)];
        }
      return null;
    }, size: function(){
        return cities.length;
    }
  };
});
