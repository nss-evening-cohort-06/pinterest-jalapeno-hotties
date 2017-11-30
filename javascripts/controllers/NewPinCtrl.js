"use strict";

app.controller("NewPinCtrl", function ($scope, PinService) {
    
    $scope.submitForm = () => {
        if ($scope.newPinForm.$valid){
            PinService.addNewPin($scope.pin).then(() => {
                $scope.pin = {};
                $scope.isSuccess = true;
                $scope.$dismiss("closed");
            }).catch((error) => {
                console.log("error in submitForm", error);
                $scope.isSuccess = false;
            });
        }
    };

    $scope.cancel = () => {
        $scope.$dismiss("cancel");
    };

});