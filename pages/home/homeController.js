// about controller
angular.module("myApp")
.controller("homeController", function ($scope, $http, $rootScope) {


    var req = {
        method: 'GET',
        url: 'http://localhost:5000/private/getTwoPopularInterestPoints',
        headers: {
            'content-type': 'application/json',
            'x-auth-token': $rootScope.myToken
        }
    };
    $http(req)
    .then(function mySuccess(response) {
        var results = response.data;
        $scope.rec_atractions = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
    saved();
    function saved() {
        console.log("maor434432143223");
        var req = {
            method: 'GET',
            url: 'private/getLastTwoSavedInterestPoints',
            headers: {
                'content-type': 'application/json',
                'x-auth-token': $rootScope.myToken
            }
        };
        console.log("maor434432143223");
        $http(req).
        then(function mySuccess(response) {
            var results = response.data;
            $scope.saved_attractions = results;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        })
    }
});