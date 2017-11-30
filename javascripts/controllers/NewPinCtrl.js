"use strict";

app.controller("NewPinCtrl", function ($scope, PinService) {
    
    $scope.submitForm = () => {
        if ($scope.newPinForm.$valid){
            PinService.addNewPin($scope.pin).then(() => {
                $scope.pin = {};
                $scope.$dismiss("pin added");
            }).catch((error) => {
                console.log("error in submitForm", error);
                $scope.isSuccess = false;
                PinService.alertTimeout(3);
            });
        }
    };

    $scope.cancel = () => {
        $scope.$dismiss("canceled");
    };

});