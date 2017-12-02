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
        const newBoard = {
            name: $scope.boardName
        };
        PinService.addNewBoard(newBoard).then((result) => {
            const newUserBoard = {
                uid: $rootScope.uid,
                bid: result.data.name
            };
            PinService.addNewUserBoard(newUserBoard).then((userBoardResult) => {
                $scope.addPinToBoard($scope.pin.id, result.data.name);
            }).catch((err) => {
                console.log('error in addNewUserBoard in PinDetailCtrl');
            });

        }).catch((err) => {
            console.log('error in createBoardWithPin in PinDetailCtrl');
        });
    };

        $scope.addPinToBoard = (pid, bid) => {
                const newPinBoard = {
                    bid: bid,
                    pid: pid
                };
                PinService.addNewPinBoard(newPinBoard).then((result) => {
                    $scope.cancel();
                }).catch((err) => {
                    console.log('error in addNewPinBoard in PinDetailCtrl');
                });
        };

    $scope.cancel = () => {
        $scope.$dismiss("cancel");
    };

});