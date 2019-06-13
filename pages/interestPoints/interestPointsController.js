// interestPoints controller
angular.module("myApp")
.controller("interestPointsController", function ($scope, $http,$rootScope) {
    self = this;

    req = {
        method: 'GET',
        url: $rootScope.host + 'getAllCategories'
    };

    $http(req)
        .then(function mySuccess(response) {
            var allCategories = response.data;
            var cat1 = allCategories[0];
            var cat2 = allCategories[1];
            var cat3 = allCategories[2];
            var cat4 = allCategories[3];

            $scope.category1_name = cat1['category_name'];
            $scope.category2_name = cat2['category_name'];
            $scope.category3_name = cat3['category_name'];
            $scope.category4_name = cat4['category_name'];
            //
            // if ($rootScope.myToken == null)
            //     $scope.star="images\\Star-Empty-icon.png";

            req = {
                method: 'GET',
                url: $rootScope.host + 'getAllInterestPointsByCategory/' + cat1['category_id']
            };
            $http(req)
                .then(function mySuccess(response) {
                var results = response.data;
                $scope.category1 = response.data;

                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            req = {
                method: 'GET',
                url: $rootScope.host + 'getAllInterestPointsByCategory/' + cat2['category_id']
            };
            $http(req)
                .then(function mySuccess(response) {
                    var results = response.data;
                    $scope.category2 = response.data;
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            req = {
                method: 'GET',
                url: $rootScope.host + 'getAllInterestPointsByCategory/' + cat3['category_id']
            };
            $http(req)
                .then(function mySuccess(response) {
                    var results = response.data;
                    $scope.category3 = response.data;
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            req = {
                method: 'GET',
                url: $rootScope.host + 'getAllInterestPointsByCategory/' + cat4['category_id']
            };
            $http(req)
                .then(function mySuccess(response) {
                    var results = response.data;
                    $scope.category4 = response.data;
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });

        }, function myError(response) {
            // $scope.myWelcome = response.statusText;
            console.log("error in loginController.checkCardentioals");
        });


});