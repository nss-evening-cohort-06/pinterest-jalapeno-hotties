"use strict"; 

app.controller("UserBoardCtrl", function ($location, $rootScope, $routeParams, $scope, PinService) {
    $scope.pin = {};

    $scope.isSuccess = null;

    const getBoardPins = (bid) => {
        PinService.getPinsByBoardId(bid).then((results) => {
            $scope.pins = results;
        }).catch((error) => {
            console.log("error in getPins in HomeCtrl", error);
        });
    };

    getBoardPins($routeParams.id);

    PinService.getBoardByBid($routeParams.id).then((board) => {
        $scope.boardName = board.name; 
    }); 

    $scope.$on("updatePins", function(){
        getBoardPins($routeParams.id);
        $scope.isSuccess = true;
        PinService.alertTimeout(3); 
    });

});