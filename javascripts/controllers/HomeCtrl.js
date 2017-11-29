"use strict"; 

app.controller("DetailCtrl", function ($location, $routeParams, $scope, PinService) {

    const getPins = () => {
        PinService.getAllPins().then((results) => {
            console.log("all pins", results.data);
            $scope.pins = results.data;
        }).catch((error) => {
            console.log("error in getPins in HomeCtrl", error);
        });
    };

    getPins();


});
