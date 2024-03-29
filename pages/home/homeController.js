// about controller
angular.module("myApp")
.controller("homeController", function ($scope, $http, $rootScope,$location) {


    popular();
    saved();

    function  popular() {
        var req = {
            method: 'GET',
            url: $rootScope.host + 'private/getTwoPopularInterestPoints',
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
    }
    function saved() {
        var req = {
            method: 'GET',
            url: $rootScope.host + 'private/getLastTwoSavedInterestPoints',
            headers: {
                'content-type': 'application/json',
                'x-auth-token': $rootScope.myToken
            }
        };
        $http(req).
        then(function mySuccess(response) {
            var results = response.data;
            if (results.length == 0) {
                $scope.saved_text = "You have not saved any interest point yet. Explore them and save your favorites!"
            }
            else {
                // console.log(results);
                $scope.saved_attractions = results;
            }

        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        })
    }


    $scope.openDetailsPage = function(atraction){
        sessionStorage.setItem('lastLocation', $location.path());
        sessionStorage.setItem('poi',JSON.stringify(atraction));
        $rootScope.poi = atraction;
        $location.path("/details");
    };

});