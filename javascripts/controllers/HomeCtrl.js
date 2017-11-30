"use strict"; 

app.controller("HomeCtrl", function ($location, $routeParams, $scope, PinService) {
    $scope.pin = {};

    const getPins = () => {
        PinService.getAllPins().then((results) => {
            $scope.pins = results;
        }).catch((error) => {
            console.log("error in getPins in HomeCtrl", error);
        });
    };

    getPins();

    $scope.$on("updatePins", function(){
        getPins();
    });

    const getBoardsById = (uid) => {
        PinService.getBoardByUid().then((results) => {
            $scope.boards = results;
        }).catch((error) => {
            console.log("error in getBoardsById in HomeCtrl", error);
        });

    };

});
