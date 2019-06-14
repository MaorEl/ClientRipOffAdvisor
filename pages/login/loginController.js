// interestPoints controller
angular.module("myApp")
    .controller("loginController", function ($scope, $http, $rootScope) {
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
                    $rootScope.user = _username;
                    $rootScope.myToken = response.data;
                    $rootScope.home = "#!home";
                    sessionStorage.setItem('token',response.data);
                    sessionStorage.setItem('username',$rootScope.user);
                    $rootScope.logged = true;
                    $rootScope.not_logged = false;
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
        $rootScope.logout = function () {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            $rootScope.logged = false;
            $rootScope.not_logged = true;
            $rootScope.user = 'guest';
        };
    });