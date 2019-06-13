// about controller
angular.module("myApp")
    .controller("exploreController", function ($scope, $http,$rootScope) {
        var data = {
            method: "GET",
            url: $rootScope.host + "getThreeRandom/3"
        };
        $http(data).then(function mySuccess(response) {
            var results = response.data;
            $scope.atractions = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        })
    });