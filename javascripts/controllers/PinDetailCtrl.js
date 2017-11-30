"use strict";

app.controller("PinDetailCtrl", function ($rootScope, $scope, PinService) {
    $scope.boards = [];
    const getBoardsById = () => {
        PinService.getBoardByUid($rootScope.uid).then((results) => {
            $scope.boards = results;
        }).catch((error) => {
            console.log("error in getBoardsById in HomeCtrl", error);
        });

    };

    getBoardsById();

    $scope.cancel = () => {
        $scope.$dismiss("cancel");
    };

});