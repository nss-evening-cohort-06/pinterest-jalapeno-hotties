"use strict";

app.controller("NavCtrl", function ($location, $rootScope, $scope, $window, AuthService) {

    $rootScope.searchTextNav = {
        text: ""
    };    

    $scope.logoutUser = () => {
        delete $rootScope.uid; 
        $window.localStorage.clear(); 
        AuthService.logout(); 
        $location.path('/auth'); 
    };


});
