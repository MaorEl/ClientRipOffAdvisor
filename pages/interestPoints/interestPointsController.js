// function checkSize(results) {
//     for (var i = 0; i<results.length ; i ++){
//         var img = results[i]['image'];
//         if (img.height > 300 || img.width > 300){
//             img.height = img.height/2;
//             img.width = img.width/2;
//             console.log(img.height , img.width);
//             results[i]['image'] = img;
//         }
//     }
// }

// interestPoints controller
angular.module("myApp")
.controller("interestPointsController", function ($scope, $http,$rootScope,$location) {
    $scope.ip_page_func = function(sort) {
        var command;
        if (sort)
            command = 'getAllInterestPointsByCategorySortedByRank/';
        else
            command = 'getAllInterestPointsByCategory/';
        req = {
            method: 'GET',
            url: $rootScope.host + 'getAllCategories'
        };

        var allCategories, cat1, cat2, cat3, cat4;

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
            }, function myError(response) {
                console.log(response);
            });

        var dictionaryOfUserPoints = [];

        if ($rootScope.myToken != null) { //** not connected user
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
                    for (let i = 0; i < res.length; i++) {
                        dictionaryOfUserPoints.push(res[i].id);
                    }
                });
        }

        $http(req)
            .then(function mySuccess(response) {
                req = {
                    method: 'GET',
                    url: $rootScope.host + command + cat1['category_id']
                };
                $http(req)
                    .then(function mySuccess(response) {
                        let results = response.data;
                        for (let i = 0; i < results.length; i++) {
                            if (dictionaryOfUserPoints.indexOf(results[i].id) !== -1)
                                results[i]["isFavor"] = 'images/Star-Full-icon.png';
                            else
                                results[i]["isFavor"] = 'images/Star-Empty-icon.png';
                        }
                        // results = checkSize(results);
                        $scope.category1 = results;
                    }, function myError(response) {
                        $scope.myWelcome = response.statusText;
                    });

                req = {
                    method: 'GET',
                    url: $rootScope.host + command + cat2['category_id']
                };
                $http(req)
                    .then(function mySuccess(response) {
                        let results = response.data;
                        for (let i = 0; i < results.length; i++) {
                            if (dictionaryOfUserPoints.indexOf(results[i].id) !== -1)
                                results[i]["isFavor"] = 'images/Star-Full-icon.png';
                            else
                                results[i]["isFavor"] = 'images/Star-Empty-icon.png';
                        }
                        $scope.category2 = results;
                    }, function myError(response) {
                        $scope.myWelcome = response.statusText;
                    });
                req = {
                    method: 'GET',
                    url: $rootScope.host + command + cat3['category_id']
                };
                $http(req)
                    .then(function mySuccess(response) {
                        let results = response.data;
                        for (let i = 0; i < results.length; i++) {
                            if (dictionaryOfUserPoints.indexOf(results[i].id) !== -1)
                                results[i]["isFavor"] = 'images/Star-Full-icon.png';
                            else
                                results[i]["isFavor"] = 'images/Star-Empty-icon.png';
                        }
                        $scope.category3 = results;
                    }, function myError(response) {
                        $scope.myWelcome = response.statusText;
                    });
                req = {
                    method: 'GET',
                    url: $rootScope.host + command + cat4['category_id']
                };
                $http(req)
                    .then(function mySuccess(response) {
                        let results = response.data;
                        for (let i = 0; i < results.length; i++) {
                            if (dictionaryOfUserPoints.indexOf(results[i].id) !== -1)
                                results[i]["isFavor"] = 'images/Star-Full-icon.png';
                            else
                                results[i]["isFavor"] = 'images/Star-Empty-icon.png';
                        }
                        $scope.category4 = results;
                        if(!$scope.$$phase) {
                            $scope.$apply();
                        }

                    }, function myError(response) {
                        $scope.myWelcome = response.statusText;
                    });

            }, function myError(response) {
                // $scope.myWelcome = response.statusText;
                console.log("error in loginController.checkCardentioals");
            });


        $scope.checkSize = function (height, width) {
            console.log(height, width);
            if (height > 300 || width > 300){
                height = height/2;
                width = width/2;
            }
            console.log(height, width);
            return {
                height: height,
                width: width
            }
        }





    };
    $scope.ip_page_func(false);
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
                                sessionStorage.setItem('nof',$rootScope.num_of_favorites);
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
                                sessionStorage.setItem('nof',$rootScope.num_of_favorites);
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
        $scope.search = function () {
            var dictionaryOfUserPoints = [];

            if ($rootScope.myToken != null) { //** not connected user
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
                        for (let i = 0; i < res.length; i++) {
                            dictionaryOfUserPoints.push(res[i].id);
                        }

                    });
            }
            var text = $scope.search_text;
            req = {
                method: 'GET',
                url: $rootScope.host + 'searchForInterestPoint/' + text
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
                    $scope.search_results = results;
                    $scope.search_results_num = results.length;
                    $scope.search_results_boolean = true;
                    if (results.length !== 0) {
                        $scope.results_text = "You have found " + results.length + " interest points:";
                        $scope.category1_filter = false;
                        $scope.category2_filter = false;
                        $scope.category3_filter = false;
                        $scope.category4_filter = false;

                    }
                    else
                        $scope.results_text = "Sorry.. but there are no results. try to search something else";

                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                    $scope.search_results_boolean = false;

                });
        };

    $scope.openDetailsPage = function(atraction){
        sessionStorage.setItem('lastLocation', $location.path());
        sessionStorage.setItem('poi',JSON.stringify(atraction));
        $rootScope.poi = atraction;
        $location.path("/details");
    };

});
