"use strict";

app.controller("PinDetailCtrl", function ($rootScope, $scope, PinService) {
    $scope.boards = [];
    $scope.input = false;

    const getBoardsById = () => {
        PinService.getCurrentUserBoards($rootScope.uid).then((results) => {
            $scope.boards = results;
        }).catch((error) => {
            console.log("error in getBoardsById in HomeCtrl", error);
        });
    };

    getBoardsById();

    $scope.inputModeTrue = () => {
        $scope.input = true;
    };

    $scope.createBoardWithPin = () => {

        console.log('$scope.boardName', $scope.boardName);
        const newBoard = {
            name: $scope.boardName
        };
        PinService.addNewBoard(newBoard).then((result) => {
            const newUserBoard = {
                uid: $rootScope.uid,
                bid: result.data.name
            };
            PinService.addNewUserBoard(newUserBoard).then((result) => {
            }).catch((err) => {
                console.log('error in addNewUserBoard in PinDetailCtrl');
            });
            addPinToBoard($rootScope.pin).then((result) => {
                console.log('result', result);
            }).catch((err) => {
            console.log('error in addPinToBoard in PinDetailCtrl');
            });
        }).catch((err) => {
            console.log('error in createBoardWithPin in PinDetailCtrl');
        });
    };

    const addPinToBoard = () =>{
        console.log('inside addPinToBoard');
        $scope.pin = (pin) => {
        console.log('inside $scope.pin addPinToBoard');
        
            PinService.addNewPin($scope.pin).then((result) => {
                const newPin = {
                    description: result.data.description,
                    imageLink: result.data.imageLink,
                    name: result.data.name,
                    sourceLink: result.data.sourceLink
                };
            }).catch((err) => {
                console.log('error in addNewPin in PinDetailCtrl');
            });
            
            PinService.addNewPinBoard($scope.pinBoard).then((result) => {
                const newPinBoard = {
                    bid: $rootScope.bid,
                    pid: result.data.name
                };
            }).catch((err) => {
                console.log('error in addNewPinBoard in PinDetailCtrl');
            });
        };
    };

    $scope.cancel = () => {
        $scope.$dismiss("cancel");
    };

});