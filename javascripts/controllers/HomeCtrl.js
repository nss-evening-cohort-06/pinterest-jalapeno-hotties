"use strict"; 

app.controller("HomeCtrl", function ($location, $rootScope, $routeParams, $scope, PinService) {
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

});
