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

    // const lauchModal = (partial/pinDetail.html, PinDetailCtrl) => {

    // };

    const getBoardsById = () => {
        PinService.getBoardByUid($rootScope.uid).then((results) => {
            $scope.boards = results;
        }).catch((error) => {
            console.log("error in getBoardsById in HomeCtrl", error);
        });

    };

    getBoardsById();

});
