// about controller
angular.module("myApp")
.controller("homeController", function ($scope, $http) {
    $http({
        method : "GET",
        url : "http://localhost:5000/private/getTwoPopularInterestPoints"
    }).then(function mySuccess(response) {
        var results = response.data;
        $scope.rec_atractions = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    })
});