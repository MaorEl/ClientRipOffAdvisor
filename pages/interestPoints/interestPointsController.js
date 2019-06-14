// interestPoints controller
angular.module("myApp")
.controller("interestPointsController", function ($scope, $http,$rootScope) {
    req = {
        method: 'GET',
        url: $rootScope.host + 'getAllCategories'
    };

    var allCategories, cat1,cat2,cat3,cat4;

    $http(req)
        .then(function mySuccess(response) {
            allCategories = response.data;
            cat1 = allCategories[0];
            cat2 = allCategories[1];
            cat3 = allCategories[2];
            cat4 = allCategories[3];

            $scope.category1_name = cat1['category_name'];
            $scope.category2_name = cat2['category_name'];
            $scope.category3_name = cat3['category_name'];
            $scope.category4_name = cat4['category_name'];
        });

    var dictionaryOfUserPoints = [];

    if ($rootScope.myToken != null){ //** not connected user
        req = {
            method: 'GET',
            url: $rootScope.host + 'private/getAllFavorites',
            headers: {
                'x-auth-token': $rootScope.myToken
            }
        };

        $http(req)
            .then(function mySuccess(response) {
                let res = response.data;
                for ( let i = 0; i < res.length ; i ++){
                    dictionaryOfUserPoints.push(res[i].id);
                }
            });
    }

    $http(req)
        .then(function mySuccess(response) {
            req = {
                method: 'GET',
                url: $rootScope.host + 'getAllInterestPointsByCategory/' + cat1['category_id']
            };
            $http(req)
                .then(function mySuccess(response) {
                let results = response.data;
                for (let i = 0; i < results.length ; i ++){
                    if (dictionaryOfUserPoints.indexOf(results[i].id) !== -1)
                        results[i]["isFavor"] = 'images/Star-Full-icon.png';
                    else
                        results[i]["isFavor"] =  'images/Star-Empty-icon.png';
                }
                $scope.category1 = results;
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });

            req = {
                method: 'GET',
                url: $rootScope.host + 'getAllInterestPointsByCategory/' + cat2['category_id']
            };
            $http(req)
                .then(function mySuccess(response) {
                    let results = response.data;
                    for (let i = 0; i < results.length ; i ++){
                        if (dictionaryOfUserPoints.indexOf(results[i].id) !== -1)
                            results[i]["isFavor"] =  'images/Star-Full-icon.png';
                        else
                            results[i]["isFavor"] =  'images/Star-Empty-icon.png';
                    }
                    $scope.category2 = results;
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            req = {
                method: 'GET',
                url: $rootScope.host + 'getAllInterestPointsByCategory/' + cat3['category_id']
            };
            $http(req)
                .then(function mySuccess(response) {
                    let results = response.data;
                    for (let i = 0; i < results.length ; i ++){
                        if (dictionaryOfUserPoints.indexOf(results[i].id) !== -1)
                            results[i]["isFavor"] =  'images/Star-Full-icon.png';
                        else
                            results[i]["isFavor"] =  'images/Star-Empty-icon.png';
                    }
                    $scope.category3 = results;
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            req = {
                method: 'GET',
                url: $rootScope.host + 'getAllInterestPointsByCategory/' + cat4['category_id']
            };
            $http(req)
                .then(function mySuccess(response) {
                    let results = response.data;
                    for (let i = 0; i < results.length ; i ++){
                        if (dictionaryOfUserPoints.indexOf(results[i].id) !== -1)
                            results[i]["isFavor"] =  'images/Star-Full-icon.png';
                        else
                            results[i]["isFavor"] =  'images/Star-Empty-icon.png';
                    }
                    $scope.category4 = results;
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });

        }, function myError(response) {
            // $scope.myWelcome = response.statusText;
            console.log("error in loginController.checkCardentioals");
        });

    $scope.addOrRemoveToFavorite = function (id, isFavor,atraction){
        if ($rootScope.myToken != null){
            if (isFavor === "images/Star-Empty-icon.png"){ //need to add to favorites
                req = {
                    method: 'POST',
                    url: $rootScope.host + 'private/addToFavorites',
                    headers: {
                        'x-auth-token': $rootScope.myToken
                    },
                    params: {
                        'ip_id': id
                    }
                };
                $http(req)
                    .then(function mySuccess(response) {
                        atraction.isFavor = 'images/Star-Full-icon.png';
                    }, function myError(response) {
                        $scope.myWelcome = response.statusText;
                    });
            }
            else{
                req = {
                    method: 'DELETE',
                    url: $rootScope.host + 'private/deleteFromFavorites',
                    headers: {
                        'x-auth-token': $rootScope.myToken
                    },
                    params: {
                        'ip_id': id
                    }
                };
                $http(req)
                    .then(function mySuccess(response) {
                        atraction.isFavor = 'images/Star-Empty-icon.png';
                    }, function myError(response) {
                        $scope.myWelcome = response.statusText;
                    });
            }
        }
        else{
            $window.alert("You need to Login to add to favorites :) ");
        }
    }



});