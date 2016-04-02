angular.module('starter.controllers', [])

.controller('SafespaceCtrl', function($scope) {
    $scope.showSearchBar = false;
    $scope.showSearch = function(){
        $scope.showSearchBar = !$scope.showSearchBar;
        console.log($scope.showSearchBar);
    };
    $scope.listItems = ["My name is Mark",2, "I am remarkable",4, "I like to use bookmarks",6,"Markers are fun",8];
    
})
.controller('RandomCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
