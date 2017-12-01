"use strict";

app.controller("BoardCtrl", function ($location, $routeParams, $rootScope, $scope, PinService) {

  $scope.getBoards = () => {
      PinService.getCurrentUserBoards($rootScope.uid).then((results) => {
      $rootScope.boards = results;
    }).catch((error)=> {
      console.log("error in getBoardByUid", error);
    });
  };

});
