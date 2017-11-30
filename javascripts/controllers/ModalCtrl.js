"use strict"; 

app.controller("ModalCtrl", ['$rootScope', '$scope', '$uibModal',

    function ($rootScope, $scope, $uibModal) {

        $scope.launchModal = (template, controller) => {

            var modalInstance = $uibModal.open({
                templateUrl: template, 
                controller: controller, 
                scope: $scope,
            });

            modalInstance.result.then(function () {
            }, function () {
                $rootScope.$broadcast("updatePins");
            });
        };

    }
]);


