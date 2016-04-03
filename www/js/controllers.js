angular.module('starter.controllers', [])

.controller('SafespaceCtrl', function($scope, Cities, $state, $ionicModal) {
    $scope.data = {
        crimeRates: 33
    };
    $scope.showSearchBar = false;
    //var search = document.getElementById("main-search");
$scope.listItems = Cities.all();
  $scope.remove = function(city) {
    Cities.remove(city);
  };
    
    $scope.close = function() {console.log($scope.data.crimeRates);
    $scope.modal.hide();
        
  };
    $scope.showSearch = function(){
        $scope.showSearchBar = !$scope.showSearchBar;
//        if($scope.showSearchBar){
//            search.focus();
//        }
        
    };
//    $scope.listItems = [{name: "My name is Mark", id:4, image: "https://pixabay.com/static/uploads/photo/2015/10/01/21/39/background-image-967820_960_720.jpg", info:"I DON'T KNOW YET."},2, "I am remarkable",4, "I like to use bookmarks",6,"Markers are fun",8];
    $scope.showSliders = function() {
        $ionicModal.fromTemplateUrl('templates/sliders.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
          modal.show();
        });
    };
    
    $scope.log = function() {
        console.log($scope.data.crimeRates);
    }
    
})
.controller('RandomCtrl', function($scope) {})
.controller('SlidersCtrl', function($scope) {
    console.log('sliders');
})

.controller('ChatsCtrl', function($scope, Cities) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.cities = Cities.all();
  $scope.remove = function(city) {
    Cities.remove(city);
  };
})

.controller('SafespaceDetailCtrl', function($scope, $stateParams, Cities) {
  $scope.safespace = Cities.get($stateParams.spaceId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
