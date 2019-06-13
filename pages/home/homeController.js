// about controller
angular.module("myApp")
.controller("exploreController", function ($scope, $http) {
    $http({
        method : "GET",
        url : "http://localhost:5000/getThreeRandom/3"
    }).then(function mySuccess(response) {
        var results = response.data;
        $scope.atractions = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    })
});