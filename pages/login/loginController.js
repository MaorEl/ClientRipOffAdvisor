// interestPoints controller
angular.module("myApp")
    .controller("loginController", function ($scope, $http, $rootScope, $location) {
        $scope.stepOneRestore = false;
            $scope.checkCardentioals = function () {
            var _username = $scope.username;
            var _password = $scope.password;
            var req = {
                method: 'POST',
                url: $rootScope.host + 'login',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    username: _username,
                    password: _password
                }
            };
            $http(req)
                .then(function mySuccess(response) {
                    if (!angular.equals({},response.data)) {
                        $rootScope.user = _username;
                        $rootScope.myToken = response.data;
                        $rootScope.home = "#!home";
                        sessionStorage.setItem('token',response.data);
                        sessionStorage.setItem('username',$rootScope.user);
                        $rootScope.logged = true;
                        $rootScope.not_logged = false;
                        $location.path("/home");
                        $scope.updateFav();
                    }
                    else {
                        alert("there is problem with your username and/or your password");
                    }

                }, function myError(response) {
                    // $scope.myWelcome = response.statusText;
                    console.log("error in loginController.checkCardentioals");
                })
        };
        $scope.restorePassword = function () {
            // console.log($scope);
            var usernameForRestore = $scope.usernameForRestore;
            // console.log(usernameForRestore);
            $rootScope.usernameForRestore = usernameForRestore;
        };

        $scope.updateFav = function() {
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
                        $rootScope.num_of_favorites = dictionaryOfUserPoints.length;
                        $rootScope.fav_icon = "images/fav_icons/w" + $rootScope.num_of_favorites +".png";
                    });
            }
        }

    });