"use strict";

app.controller("RemovePinCtrl", function ($scope, PinService) {
    
    $scope.removePin = (pinBoardId) => {
        PinService.deletePinBoardRecord(pinBoardId).then(() => {
            $scope.$dismiss("pin removed");
        }).catch((error) => {
            console.log("error in submitForm", error);
            $scope.isSuccess = false;
            PinService.alertTimeout(3);
        });
    };

    $scope.cancel = () => {
        $scope.$dismiss("canceled");
    };

});