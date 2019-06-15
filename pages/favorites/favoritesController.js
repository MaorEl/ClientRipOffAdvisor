// about controller
angular.module("myApp")
.controller("favoritesController", function ($scope, $http, $rootScope,$location) {

    $scope.saveSort = function () {
        var json = {};
        for (let x = 0; x < $scope.dictionaryOfUserPoints.length; x++) {
            var jsonObj = {};
            jsonObj['interestPointID'] = $scope.dictionaryOfUserPoints[x].id;
            jsonObj['i'] = x;
            json[x] = jsonObj;
        }
        req = {
            method: 'PUT',
            url: $rootScope.host + 'private/updateSortOption',
            headers: {
                'x-auth-token': $rootScope.myToken
            },
            data: json
        };
        $http(req)
            .then(function mySuccess(response) {
                atraction.isFavor = 'images/Star-Full-icon.png';
                if ($rootScope.num_of_favorites < 20) {
                    $rootScope.num_of_favorites++;
                }
                $rootScope.fav_icon = "images/fav_icons/w" + $rootScope.num_of_favorites +".png";
            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });

    };

    var sort_by = function(field, reverse, primer){

        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    };

    $scope.saved = function(howto) {



        $scope.dictionaryOfUserPoints = [];
        var command = 'getAllFavorites';



        if ($rootScope.myToken != null) { //** not connected user
            req = {
                method: 'GET',
                url: $rootScope.host + 'private/' + command,
                headers: {
                    'x-auth-token': $rootScope.myToken
                }
            };

            $http(req)
                .then(function mySuccess(response) {
                    let res = response.data;
                    if (res.length == 0)
                        $scope.saved_text = "You have not saved any interest points to your favorites!\n Go and explore our website! enjoy...";
                    else
                        $scope.saved_text = "";

                    for (let i = 0; i < res.length; i++) {
                        $scope.dictionaryOfUserPoints.push(res[i]);
                        $scope.dictionaryOfUserPoints[i]["isFavor"] = 'images/Star-Full-icon.png';

                    }

                    function shuffleArray(a) { // Fisher-Yates shuffle, no side effects
                        var i = a.length, t, j;
                        a = a.slice();
                        while (--i) t = a[i], a[i] = a[j = ~~(Math.random() * (i+1))], a[j] = t;
                        return a;
                    }

                    if (howto=="rank")
                        $scope.dictionaryOfUserPoints.sort(sort_by('rank', true, parseFloat));
                    else if (howto=="category")
                            $scope.dictionaryOfUserPoints.sort(sort_by('category id', true, parseInt));
                    else if (howto=="random") {
                        $scope.dictionaryOfUserPoints = shuffleArray($scope.dictionaryOfUserPoints);
                    }
                    if(!$scope.$$phase) {
                        $scope.$apply();
                    }


                });
        }
    };

    $scope.openDetailsPage = function(atraction){
        sessionStorage.setItem('lastLocation', $location.path());
        sessionStorage.setItem('poi',JSON.stringify(atraction));
        $rootScope.poi = atraction;
        $location.path("/details");
    };

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
                        if ($rootScope.num_of_favorites < 20) {
                            $rootScope.num_of_favorites++;
                        }
                        $rootScope.fav_icon = "images/fav_icons/w" + $rootScope.num_of_favorites +".png";
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
                        if ($rootScope.num_of_favorites > 0) {
                            $rootScope.num_of_favorites--;
                        }
                        $rootScope.fav_icon = "images/fav_icons/w" + $rootScope.num_of_favorites +".png";
                    }, function myError(response) {
                        $scope.myWelcome = response.statusText;
                    });
            }
        }
        else{
            alert("You need to Login to add to favorites :) ");
        }

    };

    $scope.saved();



});